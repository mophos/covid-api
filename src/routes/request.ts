/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { RequestModel } from '../models/request';

const requestModel = new RequestModel();
const router: Router = Router();

router.get('/request', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

// save new request
router.post('/request', async (req: Request, res: Response) => {
  let code = moment().format('x');
  let cause = req.body.cause;
  let customerId = req.decoded.id;
  let requestDate = moment().format('YYYY-MM-DD');
  let requestTime = moment().format('HH:mm:ss');

  let data: any = {};
  data.request_code = code;
  data.request_cause = cause;
  data.customer_id = customerId;
  data.request_date = requestDate;
  data.request_time = requestTime;

  try {
    await requestModel.saveRequest(req.db, data);
    res.send({ ok: true, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

export default router;