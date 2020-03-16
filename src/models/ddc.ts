import * as Knex from 'knex';
const request = require('request');
export class DdcModel {

  summaryTh() {
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


}