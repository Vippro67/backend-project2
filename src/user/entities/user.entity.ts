import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { CreateDateColumn, OneToMany } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { Group } from 'src/group/entities/group.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Relationship } from 'src/relationship/entities/relationship.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  refresh_token: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @Column({ default: 1 })
  status: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment)
  comments: Comment[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'user_groups',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'group_id' },
  })
  groups: Group[];

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'post_likes',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  likedPosts: Post[];

  @ManyToMany(() => Relationship, (relationship) => relationship.user)
  friends: Relationship[];

  @ManyToMany(() => Relationship, (relationship) => relationship.friend)
  friendOf: Relationship[];

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'user_history_tags',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  historyTags: Tag[];

  @Column({ default: 'regular' }) // regular, admin
  userType: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
