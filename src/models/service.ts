import * as Knex from 'knex';

export class ServiceModel {

  incrementCount(db: Knex) {
    return db('web_visit')
      .increment('count', 1);
  }

  getCount(db: Knex) {
    return db('web_visit');
  }

}