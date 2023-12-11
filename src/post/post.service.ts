import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { Media } from 'src/media/entities/media.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import * as AWS from 'aws-sdk';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}
  keyID: string = process.env.AWS_ACCESS_KEY_ID;
  keySecret: string = process.env.AWS_SECRET_ACCESS_KEY;
  region: string = process.env.AWS_REGION;
  bucketName: string = process.env.AWS_S3_BUCKET_NAME;

  s3 = new AWS.S3({
    accessKeyId: this.keyID,
    secretAccessKey: this.keySecret,
  });

  async create(
    userId: string,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    enum MediaType {
      IMAGE = 'image',
      VIDEO = 'video',
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    const post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.user = user;
    try {
      const savedPost = await this.postRepository.save(post);
      if (file) {
        const media = new Media();
        const type = file.mimetype.split('/')[0];
        if (type == 'image') {
          media.type = MediaType.IMAGE;
        } else if (type == 'video') {
          media.type = MediaType.VIDEO;
        }
        media.link = '';
        media.post = savedPost;
        await this.mediaRepository.save(media);
        savedPost.media = media;
        const params = {
          Bucket: this.bucketName,
          Key: `post/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        };
        try {
          const result = await this.s3.upload(params).promise();
          media.link = result.Location;
          post.media = await this.mediaRepository.save(media);
        } catch (error) {
          throw new BadRequestException('Failed to upload media: ' + error);
        }
      }
      if (createPostDto.tagNames) {
        if (Array.isArray(createPostDto.tagNames)) {
          const tags: Tag[] = await Promise.all(
            createPostDto.tagNames.map(async (tagName) => {
              const lowerCaseTagName = tagName.toLowerCase();
              let tag = await this.tagRepository.findOne({
                where: { name: lowerCaseTagName },
              });
              if (!tag) {
                tag = this.tagRepository.create({ name: lowerCaseTagName });
                await this.tagRepository.save(tag);
              }
              return tag;
            }),
          );
          post.tags = tags;
        }
      }
      if (createPostDto.group_id) {
        const group = await this.groupRepository.findOne({
          where: { id: createPostDto.group_id },
        });
        post.group = group;
      }
      await this.postRepository.save(post);
      return this.postRepository.findOne({
        where: { id: savedPost.id },
        relations: ['user', 'comments', 'media', 'tags'],
        select: {
          user: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            avatar: true,
          },
          comments: true,
          tags: {
            name: true,
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Can not create post :' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    userId: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    enum MediaType {
      IMAGE = 'image',
      VIDEO = 'video',
    }
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
      },
    });
    if (post.user.id !== userId) {
      throw new HttpException(
        'You are not authorized to update this post',
        HttpStatus.UNAUTHORIZED,
      );
    }
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    if (file) {
      const media = new Media();
      const type = file.mimetype.split('/')[0];
      if (type == 'image') {
        media.type = MediaType.IMAGE;
      } else if (type == 'video') {
        media.type = MediaType.VIDEO;
      }
      const params = {
        Bucket: this.bucketName,
        Key: `post/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      try {
        const result = await this.s3.upload(params).promise();
        media.link = result.Location;
      } catch (error) {
        throw new BadRequestException('Failed to upload avatar' + error);
      }
      media.post = post;
      await this.mediaRepository.delete({ post: post });
      const savedMedia = await this.mediaRepository.save(media);
      await this.postRepository.update(post.id, { media: savedMedia });
    }
    if (updatePostDto.tagNames) {
      if (Array.isArray(updatePostDto.tagNames)) {
        const tags: Tag[] = await Promise.all(
          updatePostDto.tagNames.map(async (tagName) => {
            const lowerCaseTagName = tagName.toLowerCase();
            let tag = await this.tagRepository.findOne({
              where: { name: lowerCaseTagName },
            });
            if (!tag) {
              tag = this.tagRepository.create({ name: lowerCaseTagName });
              await this.tagRepository.save(tag);
            }
            return tag;
          }),
        );
        post.tags = tags;
      } else {
        const tagNames: string[] = updatePostDto.tagNames;
        const tagNamesString = JSON.stringify(tagNames);
        const cleanedTagNames = tagNamesString.replace(/[\[\]"\\]/g, '');
        const finalTagNames = cleanedTagNames.split(',');
        const tags: Tag[] = await Promise.all(
          finalTagNames.map(async (tagName) => {
            const lowerCaseTagName = tagName.toLowerCase();
            let tag = await this.tagRepository.findOne({
              where: { name: lowerCaseTagName },
            });
            if (!tag) {
              tag = this.tagRepository.create({ name: lowerCaseTagName });
              await this.tagRepository.save(tag);
            }
            return tag;
          }),
        );
        post.tags = tags;
      }
    }

    const savedPost = await this.postRepository.save(post);
    return this.postRepository.findOne({
      where: { id: savedPost.id },
      relations: ['user', 'comments', 'media', 'tags'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
      },
    });
  }
  async remove(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
      },
    });
    if (post.user.id !== userId) {
      throw new HttpException(
        'You are not authorized to delete this post',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.postRepository.delete(id);
  }
  async findAll(filterquery: FilterPostDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.postRepository.findAndCount({
      order: { updated_at: 'DESC' },
      relations: ['user', 'media', 'tags', 'comments', 'likes'],
      where: [
        {
          title: Like(`%${search}%`),
        },
        {
          description: Like(`%${search}%`),
        },
      ],
      take: items_per_page,
      skip: skip,
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        likes: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },

        tags: true,
      },
    });
    const totalPage = Math.ceil(total / items_per_page);
    const nextPage = Number(page) + 1 <= totalPage ? Number(page) + 1 : null;
    const prePage = Number(page) - 1 > 0 ? Number(page) - 1 : null;

    return {
      data: res,
      total,
      currentPage: page,
      items_per_page,
      totalPage,
      nextPage,
      prePage,
    };
  }

  async getPostByUserId(id: string): Promise<Post[]> {
    return await this.postRepository.find({
      where: { user: { id } },
      relations: ['user', 'comments', 'media', 'tags', 'likes'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
        likes: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'media', 'tags', 'likes'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
        likes: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
      },
    });
  }

  async togglePostLike(postId: string, userId: string): Promise<string> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['likes'],
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    if (!post.likes) {
      post.likes = [];
    }

    const userLiked = post.likes.some((user) => user.id === userId);

    const like = !userLiked;

    if (like && !userLiked) {
      post.likes.push({ id: userId } as any);
      await this.postRepository.save(post);
      await this.editUserHistoryTags(userId, postId, true);
      return 'Post liked successfully';
    } else if (!like && userLiked) {
      const initialLikesCount = post.likes.length;
      post.likes = post.likes.filter((user) => user.id !== userId);

      if (initialLikesCount === post.likes.length) {
        return 'User did not like the post';
      }

      await this.postRepository.save(post);
      await this.editUserHistoryTags(userId, postId, false);
      return 'Post disliked successfully';
    }

    return like ? 'User already liked the post' : 'User did not like the post';
  }

  async editUserHistoryTags(
    userId: string,
    postId: string,
    like: boolean,
  ): Promise<void> {
    const lpost = await this.postRepository.find({
      where: { id: postId },
      relations: ['tags'],
    });
    const luser = await this.userRepository.find({
      where: { id: userId },
      relations: ['historyTags'],
    });

    const post = lpost[0];
    const user = luser[0];

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userHistoryTags = user.historyTags;
    const postTags = post.tags;
    if (like) {
      postTags.forEach((postTag) => {
        const exist = userHistoryTags.some(
          (userHistoryTag) => userHistoryTag.id === postTag.id,
        );
        if (!exist) {
          user.historyTags.push(postTag);
        }
      });
    } else {
      postTags.forEach((postTag) => {
        user.historyTags = user.historyTags.filter(
          (userHistoryTag) => userHistoryTag.id !== postTag.id,
        );
      });
    }
    await this.userRepository.save(user);
  }
  async getRecommendedPosts(userId: string): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['historyTags', 'relationships', 'friendships', 'groups'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Get posts based on user's historyTags
    const postsByHistoryTags = await this.postRepository.find({
      where: {
        tags: {
          id: In(user.historyTags.map((tag) => tag.id)),
        },
      },
      relations: ['user', 'comments', 'media', 'tags'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
      },
    });

    // Get posts based on user's friends' posts when isFriend is true
    enum RelationshipStatus {
      PENDING = 'pending',
      CONFIRMED = 'confirmed',
    }

    const friendIds = user.relationships
      .filter(
        (friend) =>
          friend.isFriend === true &&
          friend.status === RelationshipStatus.CONFIRMED,
      )
      .map((friend) => friend.friend.id);
    const postsByFriends = await this.postRepository.find({
      where: {
        user: {
          id: In(friendIds),
        },
      },
      relations: ['user', 'comments', 'media', 'tags'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
      },
    });

    // Get posts based on user's group posts
    const groupIds = user.groups.map((group) => group.id);
    const postsByGroups = await this.postRepository.find({
      where: {
        group: {
          id: In(groupIds),
        },
      },
      relations: ['user', 'comments', 'media', 'tags'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
      },
    });

    // Merge and remove duplicates
    const allPosts = [
      ...postsByHistoryTags,
      ...postsByFriends,
      ...postsByGroups,
    ];
    const uniquePosts = Array.from(
      new Set(allPosts.map((post) => post.id)),
    ).map((id) => allPosts.find((post) => post.id === id));

    return uniquePosts;
  }
}
