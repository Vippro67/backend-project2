import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Message } from 'src/message/entities/message.entity';
import { MediaType } from '../enum/MediaType';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Post, (post) => post.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @OneToOne(() => Comment, (comment) => comment.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @OneToOne(() => Message, (message) => message.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @Column({ nullable: false })
  link: string;

  @Column('enum', { enum: MediaType })
  type: MediaType;
}
