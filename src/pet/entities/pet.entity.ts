import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Media } from 'src/media/entities/media.entity';
import { Group } from 'src/group/entities/group.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;
  
  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  sex: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  description: string;



}
