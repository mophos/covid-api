import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
import { DdcModel } from '../models/ddc';
import { ServiceModel } from '../models/service';
import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();

var request = require('request');
const router: Router = Router();
const ddcModel = new DdcModel();
const serviceModel = new ServiceModel();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

// router.get('/pr', async (req: Request, res: Response) => {
//   await ddcModel.getPr().then((rs: any) => {
//     var xmlParser = require('xml2json');
//     var json = xmlParser.toJson(rs);
//     json = json.replace(/&nbsp;/g, " ")
//     json = json.replace(/&ldquo;/g, " ")
//     json = json.replace(/&rdquo;/g, " ")
//     const data = JSON.parse(json).rss.channel.item;

//     // const result = [];
//     // for (const d of data) {
//     //   if (Object.keys(d.description).length > 0) {
//     //     result.push(d);
//     //   }
//     // }


//     res.send({ ok: true, code: HttpStatus.OK, rows: data });
//   }).catch(error => {
//     console.log(error);
//     res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });


//   })
// });

router.get('/pr', async (req: Request, res: Response) => {
  try {
    await serviceModel.getPr().then((rs: any) => {
      if (rs.ok) {
        res.send({
          ok: true,
          code: HttpStatus.OK,
          rows: rs.rows
        });
      } else {
        res.send({ ok: false, error: rs.error, code: HttpStatus.INTERNAL_SERVER_ERROR });
      }
    }).catch(error => {
      console.log(error);
    })

  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/info', async (req: Request, res: Response) => {

  const info: any = [
    { url: 'https://www3.dmsc.moph.go.th/images/map_sars_cov_2.jpg' },
    { url: 'https://ddc.moph.go.th/viralpneumonia/img/infographic/info17.jpg' },
    { url: 'https://ddc.moph.go.th/viralpneumonia/img/infographic/info16.jpg' },
    { url: 'https://ddc.moph.go.th/viralpneumonia/img/infographic/info14.jpg' }];

  res.send({ ok: true, code: HttpStatus.OK, rows: info });
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

router.get('/add-visit', async (req: Request, res: Response) => {
  try {
    await serviceModel.incrementCount(req.db);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false })
  }
});

router.get('/visit', async (req: Request, res: Response) => {
  try {
    let rs: any = await serviceModel.getCount(req.db);
    res.send({ ok: true, rows: rs[0] });
  } catch (error) {
    res.send({ ok: false })
  }
});

router.get('/summary-ddc/th', async (req: Request, res: Response) => {
  try {
    await ddcModel.summaryDdcTh().then((rs: any) => {
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

router.get('/summary/th', async (req: Request, res: Response) => {
  try {
    const rs: any = await ddcModel.summaryTh(req.db);
    res.send({
      ok: true,
      code: HttpStatus.OK,
      rows: rs[0]
    });



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


router.get('/news', async (req: Request, res: Response) => {
  try {
    const rs: any = await serviceModel.getNews(req.db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/infographic', async (req: Request, res: Response) => {
  try {
    await serviceModel.getInfographic().then((rs: any) => {
      if (rs.ok) {
        res.send({
          ok: true,
          code: HttpStatus.OK,
          rows: rs.rows
        });
      } else {
        res.send({ ok: false, error: rs.error, code: HttpStatus.INTERNAL_SERVER_ERROR });
      }
    }).catch(error => {
      console.log(error);
    })

  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});
export default router;