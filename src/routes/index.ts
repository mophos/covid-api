import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
import { DdcModel } from '../models/ddc';
var request = require('request');
import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();

const router: Router = Router();
const ddcModel = new DdcModel();
router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/summary/th', async (req: Request, res: Response) => {

  try {
    await ddcModel.summaryTh().then((rs: any) => {
      const data = rs.features[0].attributes;
      const obj = {
        confirmed: data.Confirmed,
        recovered: data.Recovered,
        deaths: data.Deaths,
        critical: data.Critical,
        newConfirmed: data.NewConfirmed,
        newRecovered: data.NewRecovered,
        newDeaths: data.NewDeaths,
        newCritical: data.NewCritical
      };

      res.send({
        ok: true,
        code: HttpStatus.OK,
        rows: obj
      });
    }).catch(error => {
      console.log(error);
      res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });


    })
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

export default router;