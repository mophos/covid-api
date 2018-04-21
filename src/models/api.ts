import * as Knex from 'knex';

export class Api {
  getStudents(db: Knex) {
    return db('students')
      .limit(20)
      .orderByRaw('first_name, last_name');
  }

  saveStudent(db: Knex, student: any) {
    return db('students').insert(student, 'id');
  }

  updateStudent(db: Knex, studentId: any, student: any) {
    return db('students').where('id', studentId).update(student);
  }

  getStudentDetail(db: Knex, studentId: any) {
    return db('students').where('id', studentId);
  }

  removeStudent(db: Knex, studentId: any) {
    return db('students').where('id', studentId).del();
  }

}