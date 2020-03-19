import * as Knex from 'knex';
const request = require('request');

export class ServiceModel {

  incrementCount(db: Knex) {
    return db('web_visit')
      .increment('count', 1);
  }

  getCount(db: Knex) {
    return db('web_visit');
  }

  getPr() {
    return new Promise((resolve, reject) => {
      var options = {
        'method': 'GET',
        'url': 'http://covid19.moph.go.th/pr/'
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