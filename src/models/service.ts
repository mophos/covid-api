import * as Knex from 'knex';
const request = require('request');

export class ServiceModel {

  incrementCount(db: Knex) {
    return db('web_visit')
      .increment('count', 1);
  }

  saveLog(db: Knex, device) {
    return db('web_visit_log')
      .insert(device);
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

  getInfographic() {
    return new Promise((resolve, reject) => {
      var options = {
        'method': 'GET',
        'url': 'http://covid19.moph.go.th/pr/infographic'
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


  getNews(db: Knex) {
    return db('news')
      .orderBy('id', 'DESC')
  }

  getCommand(db: Knex) {
    return db('command');
  }
}