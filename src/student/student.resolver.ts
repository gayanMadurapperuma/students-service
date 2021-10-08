import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentCreateDTO } from './dto/create-student.input';
import { studentUpdateDTO } from './dto/update-student.input';
import { StudentBulkCreateDTO } from './dto/create-bulk-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
// import { paginateResponse } from './paginate/paginate.response';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [Student], { name: 'getAllStudents' })
  findAll() {
    return this.studentService.findAll();
  }

  @Mutation(() => Student, { name: 'createStudent' })
  create(@Args('studentInput') student: StudentCreateDTO) {
    return this.studentService.create(student);
  }

  @Mutation(() => Boolean, { name: 'bulkStudentCreate' })
  bulkCreate(
    @Args('students', { type: () => [StudentBulkCreateDTO] })
    students: StudentBulkCreateDTO[],
  ) {
    return this.studentService.bulkCreateStudent(students);
  }

  @Query(() => Student, { name: 'getStudentById' })
  student(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  update(
    @Args('id') id: number,
    @Args('studentInput') student: studentUpdateDTO,
  ) {
    return this.studentService.update(id, student);
  }

  @Mutation(() => Number, { name: 'removeStudent' })
  remove(@Args('id') id: number) {
    return this.studentService.remove(id);
  }
}
