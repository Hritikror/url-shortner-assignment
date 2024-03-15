import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortId: string;

  @Column()
  url: string;

  @Column({type: 'timestamp', nullable: true })
  expirationTime: Date; 

  @Column({default: false})
  isDeleted: boolean;

  @Column({ type: 'json', nullable: true })
  analytics: {
      clickCount: number;
      clientInfo: {time:Date, device:string}[]
  }; 

  @ManyToOne(() => Users, user => user.urls)
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

}