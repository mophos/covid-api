import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';
const router: Router = Router();
import { EocdmsModel } from '../models/eocdms';
import * as _ from 'lodash';
const eocdmsModel = new EocdmsModel();

router.get('/', async (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api EOC_DMS server!', code: HttpStatus.OK });
});

router.get('/bed', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getBed(req.dbEocDms);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/bed/province', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getBedOpsProvince(req.dbEocDms);
    const data = [];
    const zoneCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
    for (let i = 0; i < 13; i++) {
      const detail = _.filter(rs, { zone_code: zoneCode[i] });
      const aiir_total = _.sumBy(rs, 'aiir_total');
      const isolate_total = _.sumBy(rs, 'isolate_total');
      const cohort_total = _.sumBy(rs, 'cohort_total');
      const icu_bed_total = _.sumBy(rs, 'icu_bed_total');
      const aiir_available = _.sumBy(rs, 'aiir_available');
      const isolate_available = _.sumBy(rs, 'isolate_available');
      const cohort_available = _.sumBy(rs, 'cohort_available');
      const icu_bed_available = _.sumBy(rs, 'icu_bed_available');
      const count = _.sumBy(rs, 'count');
      const total = aiir_total + isolate_total + cohort_total + icu_bed_total;
      const available = aiir_available + isolate_available + cohort_available + icu_bed_available;

      data.push({
        zone_code: i + 1,
        detail: detail,
        aiir_total: aiir_total,
        isolate_total: isolate_total,
        cohort_total: cohort_total,
        icu_bed_total: icu_bed_total,
        aiir_available,
        isolate_available,
        cohort_available,
        icu_bed_available,
        total: total,
        available,
        count
      })

    }
    res.send({ ok: true, rows: data, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/bed-out-ops/province', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getBedOutOpsProvince(req.dbEocDms);
    const data = [];
    const zoneCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
    for (let i = 0; i < 13; i++) {
      const detail = _.filter(rs, { zone_code: zoneCode[i] });
      const aiir_total = _.sumBy(rs, 'aiir_total');
      const isolate_total = _.sumBy(rs, 'isolate_total');
      const cohort_total = _.sumBy(rs, 'cohort_total');
      const icu_bed_total = _.sumBy(rs, 'icu_bed_total');
      const aiir_available = _.sumBy(rs, 'aiir_available');
      const isolate_available = _.sumBy(rs, 'isolate_available');
      const cohort_available = _.sumBy(rs, 'cohort_available');
      const icu_bed_available = _.sumBy(rs, 'icu_bed_available');
      const count = _.sumBy(rs, 'count');
      const total = aiir_total + isolate_total + cohort_total + icu_bed_total;
      const available = aiir_available + isolate_available + cohort_available + icu_bed_available;

      data.push({
        zone_code: i + 1,
        detail: detail,
        aiir_total: aiir_total,
        isolate_total: isolate_total,
        cohort_total: cohort_total,
        icu_bed_total: icu_bed_total,
        aiir_available,
        isolate_available,
        cohort_available,
        icu_bed_available,
        total,
        available,
        count
      })

    }
    res.send({ ok: true, rows: data, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/bed-sumary', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getBedSumary(req.dbEocDms);
    const aiir_total = _.sumBy(rs, 'aiir_total');
    const isolate_total = _.sumBy(rs, 'isolate_total');
    const cohort_total = _.sumBy(rs, 'cohort_total');
    const icu_bed_total = _.sumBy(rs, 'icu_bed_total');
    const aiir_available = _.sumBy(rs, 'aiir_available');
    const isolate_available = _.sumBy(rs, 'isolate_available');
    const cohort_available = _.sumBy(rs, 'cohort_available');
    const icu_bed_available = _.sumBy(rs, 'icu_bed_available');
    const count = _.sumBy(rs, 'count');
    const total = aiir_total + isolate_total + cohort_total + icu_bed_total;
    const available = aiir_available + isolate_available + cohort_available + icu_bed_available;
    const sum = {
      aiir_total,
      isolate_total,
      cohort_total,
      icu_bed_total,
      aiir_available,
      isolate_available,
      cohort_available,
      icu_bed_available,
      total,
      available,
      count
    }
    res.send({ ok: true, rows: rs, sum: sum, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/supplie/province', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getSupplieOpsProvince(req.dbEocDms);
    const data = [];
    const zoneCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
    for (let i = 0; i < 13; i++) {
      const detail = _.filter(rs, { zone_code: zoneCode[i] });
      const mask_n95 = _.sumBy(detail, 'mask_n95');
      const sugical_mask = _.sumBy(detail, 'sugical_mask');
      const water_resistance_gown = _.sumBy(detail, 'water_resistance_gown');
      const med_flavipiravir_tab = _.sumBy(detail, 'med_flavipiravir_tab');
      const cover_all = _.sumBy(detail, 'cover_all');

      const mask_n95_used_month = _.sumBy(detail, 'mask_n95_used_month');
      const sugical_mask_used_month = _.sumBy(detail, 'sugical_mask_used_month');
      const water_resistance_gown_used_month = _.sumBy(detail, 'water_resistance_gown_used_month');
      const med_flavipiravir_tab_used_month = _.sumBy(detail, 'med_flavipiravir_tab_used_month');
      const cover_all_used_month = _.sumBy(detail, 'cover_all_used_month');

      data.push({
        zone_code: i + 1,
        detail: detail,
        count: _.sumBy(detail, 'count'),
        mask_n95,
        sugical_mask,
        water_resistance_gown,
        med_flavipiravir_tab,
        cover_all,
        mask_n95_used_month,
        sugical_mask_used_month,
        water_resistance_gown_used_month,
        med_flavipiravir_tab_used_month,
        cover_all_used_month
      })

    }
    res.send({ ok: true, rows: data, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/supplie', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getSupplieOps(req.dbEocDms);
    const data = [];
    const zoneCode = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];
    for (let i = 0; i < 13; i++) {
      const detail = _.filter(rs, { zone_code: zoneCode[i] });
      const provinces = _.map(detail, 'province_code');
      const province = _.uniqBy(provinces);
      const province_ = [];
      for (const p of province) {
        const _detail = _.filter(detail, { province_code: p });
        province_.push({
          province_code:_detail[0].province_code,
          province_name:_detail[0].province_name,
          hospitals:_detail
        })
        // const obj
      }
      data.push({
        zone_code: i + 1,
        provinces :province_
      });
    }

  //   [{
  //     zone_code:01,
  //     province:[{
  //         provice_code:01
  //         hospitals:[{
  //             hospital_code:'';
  //         }]
  //     }]
  // }]
    // const mask_n95 = _.sumBy(rs, 'mask_n95');
    // const sugical_mask = _.sumBy(rs, 'sugical_mask');
    // const water_resistance_gown = _.sumBy(rs, 'water_resistance_gown');
    // const med_flavipiravir_tab = _.sumBy(rs, 'med_flavipiravir_tab');
    // const cover_all = _.sumBy(rs, 'cover_all');

    // const mask_n95_used_month = _.sumBy(rs, 'mask_n95_used_month');
    // const sugical_mask_used_month = _.sumBy(rs, 'sugical_mask_used_month');
    // const water_resistance_gown_used_month = _.sumBy(rs, 'water_resistance_gown_used_month');
    // const med_flavipiravir_tab_used_month = _.sumBy(rs, 'med_flavipiravir_tab_used_month');
    // const cover_all_used_month = _.sumBy(rs, 'cover_all_used_month');

    // data.push({
    //   count: _.sumBy(rs, 'count'),
    //   mask_n95,
    //   sugical_mask,
    //   water_resistance_gown,
    //   med_flavipiravir_tab,
    //   cover_all,
    //   mask_n95_used_month,
    //   sugical_mask_used_month,
    //   water_resistance_gown_used_month,
    //   med_flavipiravir_tab_used_month,
    //   cover_all_used_month
    // })


    res.send({ ok: true, rows: data, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/doctor', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getDoctor(req.dbEocDms);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});

router.get('/doctor-group-type', async (req: Request, res: Response) => {
  try {
    const rs: any = await eocdmsModel.getDoctorGroupType(req.dbEocDms);
    res.send({ ok: true, rows: rs, code: HttpStatus.OK });
  } catch (error) {
    console.log(error);

    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});


export default router;