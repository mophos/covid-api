import * as Knex from 'knex';

export class EocdmsModel {

  getBed(db: Knex) {
    return db('hospital_beds')
  }

  getBedOps(db: Knex) {
    return db('hospital_beds')
  }
  getBedOpsProvince(db: Knex) {
    return db('hospital_maps')
      .select(
        'zone_code',
        'province_code',
        'province_name',
        db.raw(`sum(aiir_total+isolate_total+cohort_total+icu_bed_total) as total`)
      )
      .sum('aiir_total as aiir_total')
      .sum('isolate_total as isolate_total')
      .sum('cohort_total as cohort_total')
      .sum('icu_bed_total as icu_bed_total')
      .count('* as count')
      .groupBy('province_code')
      .groupBy('zone_code')
      .where('ministry_code', '21000')
      .where('sub_ministry_code', '21002')
  }

  getBedOutOpsProvince(db: Knex) {
    return db('hospital_maps')
      .select(
        'zone_code',
        'province_code',
        'province_name',
        db.raw(`sum(aiir_total+isolate_total+cohort_total+icu_bed_total) as total`)
      )
      .sum('aiir_total as aiir_total')
      .sum('isolate_total as isolate_total')
      .sum('cohort_total as cohort_total')
      .sum('icu_bed_total as icu_bed_total')
      .count('* as count')
      .groupBy('province_code')
      .groupBy('zone_code')
      .whereNot((w) => {
        w.where('ministry_code', '21000')
          .where('sub_ministry_code', '21002')
      })
  }

  getBedSumary(db: Knex) {
    return db('hospital_maps')
      .select(
        db.raw(`if(sub_ministry_code is null,ministry_name,sub_ministry_name) as name`),
        'ministry_name',
        'sub_ministry_name',
        db.raw(`sum(aiir_total+isolate_total+cohort_total+icu_bed_total) as total`),
        db.raw(`sum(aiir_total+isolate_total+cohort_total+icu_bed_total) as total_available`)
      )
      .sum('aiir_total as aiir_total')
      .sum('isolate_total as isolate_total')
      .sum('cohort_total as cohort_total')
      .sum('icu_bed_total as icu_bed_total')

      .sum('aiir_available as aiir_available')
      .sum('isolate_available as isolate_available')
      .sum('cohort_available as cohort_available')
      .sum('icu_bed_available as icu_bed_available')
      .count('* as count')
      .groupBy('ministry_code')
      .groupBy('sub_ministry_code')

  }

  getSupplieOpsProvince(db: Knex) {
    return db('hospital_maps')
      .select(
        'zone_code',
        'province_code',
        'province_name'
      )
      .sum('mask_n95 as mask_n95')
      .sum('sugical_mask as sugical_mask')
      .sum('water_resistance_gown as water_resistance_gown')
      .sum('med_flavipiravir_tab as med_flavipiravir_tab')
      .sum('cover_all as cover_all')

      .sum('mask_n95_used_month as mask_n95_used_month')
      .sum('sugical_mask_used_month as sugical_mask_used_month')
      .sum('water_resistance_gown_used_month as water_resistance_gown_used_month')
      .sum('med_flavipiravir_tab_used_month as med_flavipiravir_tab_used_month')
      .sum('cover_all_used_month as cover_all_used_month')
      .count('* as count')
      .groupBy('province_code')
      .groupBy('zone_code')
      .where('ministry_code', '21000')
      .where('sub_ministry_code', '21002')
  }

  getSupplieOps(db: Knex) {
    return db('hospital_maps')
      .select(
        'zone_code',
        'province_code',
        'province_name',
        'hospname',
        'mask_n95',
        'sugical_mask',
        'water_resistance_gown',
        'cover_all',
        'med_flavipiravir_tab',
        'mask_n95_used_month',
        'sugical_mask_used_month',
        'water_resistance_gown_used_month',
        'med_flavipiravir_tab_used_month'
        , 'cover_all_used_month'
      )
      // .sum('mask_n95 as mask_n95')
      // .sum('sugical_mask as sugical_mask')
      // .sum('water_resistance_gown as water_resistance_gown')
      // .sum('med_flavipiravir_tab as med_flavipiravir_tab')
      // .sum('cover_all as cover_all')

      // .sum('mask_n95_used_month as mask_n95_used_month')
      // .sum('sugical_mask_used_month as sugical_mask_used_month')
      // .sum('water_resistance_gown_used_month as water_resistance_gown_used_month')
      // .sum('med_flavipiravir_tab_used_month as med_flavipiravir_tab_used_month')
      // .sum('cover_all_used_month as cover_all_used_month')
      // .count('* as count')
      .where('ministry_code', '21000')
      .where('sub_ministry_code', '21002')
  }

  getDoctor(db: Knex) {
    return db('hrops')
      .select('department', db.raw(`if(experttype = "(ว่าง)",nurseexpert,experttype) as experttype`))
      .sum('numberofperson as numberofperson')
      .groupBy('department')
      .groupBy('experttype')
      .groupBy('nurseexpert')
      .orderBy('experttype')
      .orderBy('nurseexpert')
  }

  getDoctorGroupType(db: Knex) {
    return db('hrops')
      .select(db.raw(`if(experttype = "(ว่าง)",nurseexpert,experttype) as experttype`))
      .sum('numberofperson as numberofperson')
      .groupBy('experttype')
      .groupBy('nurseexpert')
      .orderBy('experttype', 'DESC')
  }

  getHos(db: Knex) {
    return db('hospital_new')
    .whereIn('hosptype_code',['01','02'])
    // .whereIn('hosptype_code',['05','06','07'])
    // .offset(6000)
      // .limit(2);
  }

  saveHos(db: Knex, hospcode, data) {
    return db('hospital_new')
      .update(data)
      .where('short_hospital_code', hospcode)
  }
}