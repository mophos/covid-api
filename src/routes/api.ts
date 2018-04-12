import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

export default router;