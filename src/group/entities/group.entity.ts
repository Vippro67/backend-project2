import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
   id: string;

  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_groups',
    joinColumn: { name: 'group_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
