import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { StudentCreateDTO } from './dto/create-student.input';
import { StudentBulkCreateDTO } from './dto/create-bulk-student.input';
import { Student } from './entities/student.entity';
// import { Paginate } from './paginate/paginate';
import { studentUpdateDTO } from './dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async create(student: StudentCreateDTO): Promise<Student> {
    return this.studentRepository.save(
      this.studentRepository.create({
        ...student,
        age: moment().diff(student.dob, 'years', false),
        createdAt: Date.now(),
      }),
    );
  }

  async findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneOrFail(id);
  }

  async update(id: number, studentDTO: studentUpdateDTO): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new Error('Student not found');
    }
    if (studentDTO.dob) {
      return this.studentRepository.save({
        ...student,
        ...studentDTO,
        age: moment().diff(student.dob, 'years', false),
      });
    }
    return this.studentRepository.save({
      ...student,
      ...studentDTO,
    });
  }

  async remove(id: number): Promise<number> {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new Error('Student not found');
    }
    await this.studentRepository.remove(student);
    return id;
  }

  async bulkCreateStudent(students: StudentBulkCreateDTO[]): Promise<boolean> {
    try {
      await this.studentRepository.save(
        this.studentRepository.create(students),
      );
      return true;
    } catch (error) {
      throw new HttpException(
        {
          error,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
