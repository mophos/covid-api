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

router.get('/timeline', (req: Request, res: Response) => {
  request('https://covid19.th-stat.com/', (err, response, body) => {
    if (!err && response.statusCode === 200) {
      // console.log('body : ' + body);
      const cheerio = require('cheerio');
      let $ = cheerio.load(body);
      const s = $('script').html();
      const v = s.split("}];");
      const b = v[0].split('var data_src = ');
      const c = `${b[1]}}]`
      const utf8 = require('utf8');
      const d = utf8.decode(c)
      // console.log(`${v[0]}};`);
      const a = JSON.parse(d);


      res.send({ ok: true, code: HttpStatus.OK, rows: a });
    } else {
      res.send({ ok: false })
    }
  });

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

router.get('/summary/global', async (req: Request, res: Response) => {
  try {
    const data = [];
    await ddcModel.summaryGlobal().then((rs: any) => {
      for (const i of rs.features) {
        const d = i.attributes;

        const obj = {
          country: d.COUNTRY,
          countryJo: d.COUNTRY_JO,
          provinceS: d.Province_S,
          longtitude: d.Longtitude,
          latitude: d.Latitude,
          critical: d.Critical,
          newCases: d.NewCases,
          newDeaths: d.NewDeaths,
          totalCases: d.TotalCases,
          totalDeaths: d.TotalDeaths,
          totalRecovered: d.TotalRecovered,
          activeCase: d.ActiveCase,
          confirmedJh: d.Confirmed_JH,
          deathsJh: d.Deaths_JH,
          recoveredJh: d.Recovered_JH,
          updateDate: d.UpdateDate
        };
        data.push(obj);

      }

      res.send({
        ok: true,
        code: HttpStatus.OK,
        rows: data
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