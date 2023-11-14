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
  @PrimaryColumn('uuid')
  user_id: string;

  @PrimaryColumn('uuid')
  friend_id: string;

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.friendOf)
  @JoinColumn({ name: 'friend_id' })
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
