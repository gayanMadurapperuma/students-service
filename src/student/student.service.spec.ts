import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

describe('student service', () => {
  let service: StudentService;

  const student: Student = {
    id: 0,
    firstName: 'fake_first',
    middleName: '',
    lastName: 'fake_last',
    email: 'fake@email.com',
    dob: new Date('1992-11-30'),
    age: 28,
    createdAt: 0,
    updatedAt: 0,
    setCreatedAt: function (): void {
      throw new Error('Function not implemented.');
    },
    setUpdatedAt: function (): void {
      throw new Error('Function not implemented.');
    },
  };

  const studentRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((vlu) => Promise.resolve(vlu)),
    find: jest.fn().mockImplementation(() => Promise.resolve([student])),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(student)),
    remove: jest.fn().mockImplementation(() => Promise.resolve(student)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert bulk student list and return true', async () => {
    expect(
      await service.bulkCreateStudent([
        {
          firstName: 'test_fir',
          lastName: 'test_last',
          middleName: 'test_middl',
          age: 22,
          email: 'test@gmail.com',
          dob: new Date('2000-10-20'),
        },
      ]),
    ).toEqual(true);
  });

  it('should return all studnets', async () => {
    expect(await service.findAll()).toEqual([student]);
  });

  it('should update student', async () => {
    expect(
      await service.update(0, {
        firstName: 'gayan',
      }),
    ).toEqual({
      id: 0,
      ...student,
      firstName: 'gayan',
    });
  });

  it('should remove student', async () => {
    expect(await service.remove(0)).toEqual(0);
  });
});
