import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Url } from './url.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => Url, url => url.user)
  urls: Url[];

}