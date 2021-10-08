import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentBulkCreateDTO {
  @Field()
  firstName: string;
  @Field({ nullable: true })
  middleName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  dob: Date;
  @Field()
  age: number;
}
