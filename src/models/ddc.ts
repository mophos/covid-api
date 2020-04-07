import * as Knex from 'knex';
const request = require('request');
export class DdcModel {

  summaryDdcTh() {
    return new Promise((resolve, reject) => {
      var options = {
        'method': 'GET',
        'url': 'https://ddcportal.ddc.moph.go.th/arcgis/rest/services/iT_Neillgis/thai_cities/FeatureServer/0/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=%7B%22xmin%22%3A-0.000004861503839492798%2C%22ymin%22%3A0.000004861503839492798%2C%22xmax%22%3A20037508.342779182%2C%22ymax%22%3A20037508.342788905%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100&resultType=tile',
        'headers': {
        }
      };
      request(options, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(response.body));
        }
      });
    });
  }


  summaryTh(db: Knex) {
    return db('covid_stat')
      .orderBy('id', 'DESC')
      .limit(1);
  }

  summaryGlobal() {
    return new Promise((resolve, reject) => {
      var options = {
        'method': 'GET',
        'url': 'https://ddcportal.ddc.moph.go.th/arcgis/rest/services/iT_Neillgis/map_global_jh_point/FeatureServer/0/query?f=json&where=COUNTRY_JO%3C%3E%27Thailand%27%20AND%20TotalCases%20IS%20NOT%20NULL&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TotalCases%20desc&outSR=102100&resultOffset=0&resultRecordCount=200',
        'headers': {
        }
      };
      request(options, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(JSON.parse(response.body));
        }
      });
    });
  }

  // getPr() {
  //   return new Promise((resolve, reject) => {
  //     var options = {
  //       'method': 'GET',
  //       'url': 'https://pr.moph.go.th/rss_prmoph.php?id=1',
  //       'headers': {
  //       }
  //     };
  //     request(options, function (error, response) {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(response.body);
  //       }
  //     });
  //   });
  // }

  getgis(hospcode) {
    return new Promise((resolve, reject) => {
      var options = {
        'method': 'GET',
        'url': `https://opendata.service.moph.go.th/gis/v1/getgis/hoscode/${hospcode}`,
        'headers': {
          rejectUnauthorized: false
        }
      };
      request(options, function (error, response) {
        if (error) {
          reject(error);
        } else {
    
          resolve(JSON.parse(response.body));
        }
      });
    });
  }
}