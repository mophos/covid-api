
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Jwt } from '../models/jwt';

const jwt = new Jwt();

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  if (username === 'admin' && password === 'admin') {
    let payload = {
      id: 1,
      fullname: 'Satit Rianpit'
    }
    let token = jwt.sign(payload);
    
    res.send({ ok: true, token: token, code: HttpStatus.OK });
  } else {
    res.send({ ok: false, error: 'Login failed!', code: HttpStatus.UNAUTHORIZED });
  }
});

export default router;