import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentCreateDTO } from './dto/create-student.input';

@Controller('bulk')
export class StudentController {
  constructor(private studentService: StudentService) {}

  // @Post()
  // async bulkCreateStudent(@Body() data: StudentCreateDTO[]) {
  //   await this.studentService.bulkCreateStudent(data);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Student Create Success',
  //   };
  // }
}
