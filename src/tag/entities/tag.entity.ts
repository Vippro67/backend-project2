import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'post_id' },
  })
  posts: Post[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_history_tags',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
