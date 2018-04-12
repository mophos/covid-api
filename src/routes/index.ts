
import * as express from 'express';
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

export default router;