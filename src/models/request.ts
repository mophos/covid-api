import * as Knex from 'knex';

export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('requests')
      .insert(data);
  }

}