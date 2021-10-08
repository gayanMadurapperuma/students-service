import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentCreateDTO {
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
}
