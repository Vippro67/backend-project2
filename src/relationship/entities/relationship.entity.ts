import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryColumn,
} from 'typeorm';

enum RelationshipStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
}

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.relationships)
  user: User;

  @ManyToOne(() => User, (user) => user.friendships)
  friend: User;

  @Column({ default: false })
  isFriend: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({
    type: 'enum',
    enum: RelationshipStatus,
    default: RelationshipStatus.PENDING,
  })
  status: RelationshipStatus;

  @Column({ default: false })
  isFollowing: boolean;
}
