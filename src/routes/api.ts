import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import { Router, Request, Response } from 'express';

import { Api } from '../models/api';

const apiModel = new Api();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

router.get('/students', async (req: Request, res: Response) => {
  let db = req.db;
  try {
    let rs: any = await apiModel.getStudents(db);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
  res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

router.post('/students', async (req: Request, res: Response) => {
  let db = req.db;
  let student: any = {};
  
  student.first_name = req.body.first_name;
  student.last_name = req.body.last_name;
  student.email = req.body.email;
  student.gender = req.body.gender;
  student.university = req.body.university;
  student.img = req.body.img;

  if (student.first_name && student.last_name && student.email) {
    try {
      let rs: any = await apiModel.saveStudent(db, student);
      student.id = rs[0];
      res.send({ ok: true, info: student, code: HttpStatus.OK });
    } catch (error) {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  } else {
    res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
  }
});

router.put('/students/:id', async (req: Request, res: Response) => {
  let db = req.db;
  let student: any = {};

  let studentId: any = req.params.id;

  student.first_name = req.body.first_name;
  student.last_name = req.body.last_name;
  student.email = req.body.email;
  student.gender = req.body.gender;
  student.university = req.body.university;
  student.img = req.body.img;

  if (studentId && student.first_name && student.last_name && student.email) {
    try {
      let rs: any = await apiModel.updateStudent(db, studentId, student);
      res.send({ ok: true, info: student, code: HttpStatus.OK });
    } catch (error) {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  } else {
    res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
  }
});

router.delete('/students/:id', async (req: Request, res: Response) => {
  let db = req.db;
  let studentId: any = req.params.id;

  if (studentId) {
    try {
      let rs: any = await apiModel.removeStudent(db, studentId);
      res.send({ ok: true, code: HttpStatus.OK });
    } catch (error) {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  } else {
    res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
  }
});

router.get('/students/:id', async (req: Request, res: Response) => {
  let db = req.db;
  let studentId: any = req.params.id;

  if (studentId) {
    try {
      let rs: any = await apiModel.getStudentDetail(db, studentId);
      if (rs.length) {
        res.send({ ok: true, info: rs[0], code: HttpStatus.OK });
      } else {
        res.send({ ok: true, info: {}, code: HttpStatus.OK });
      }
    } catch (error) {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  } else {
    res.send({ ok: false, error: 'Incorrect data!', code: HttpStatus.OK });
  }
});

export default router;