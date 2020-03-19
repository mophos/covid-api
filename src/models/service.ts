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
        'url': 'http://203.157.103.175:3005',
        'headers': {
        }
      };
      request(options, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      });
    });
  }
}