import * as Knex from 'knex';

export class Login {
  doLogin(db: Knex, username: string, password: string) {
    return db('users')
      .select('fullname', 'device_token', 'image')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }
}