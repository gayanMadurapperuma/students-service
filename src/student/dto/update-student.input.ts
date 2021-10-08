import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class studentUpdateDTO {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  middleName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  dob?: Date;
}
