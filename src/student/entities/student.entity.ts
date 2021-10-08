import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Field()
  @Column()
  firstName: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName: string;
  @Column()
  @Field()
  lastName: string;
  @Column({ unique: true, nullable: false })
  @Field()
  email: string;
  @Column()
  @Field()
  dob: Date;
  @Column()
  @Field()
  age: number;
  @Column({ name: 'createdAt', readonly: true, nullable: false })
  createdAt: number;
  @Column({ name: 'updatedAt' })
  updatedAt: number;

  @BeforeInsert()
  public setCreatedAt() {
    const timestamp = Math.floor(Date.now() / 1000);
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
