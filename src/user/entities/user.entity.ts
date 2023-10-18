import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => User, (user) => user)
  followers: User[];

  @OneToMany(() => User, (user) => user)
  following: User[];
  
  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
