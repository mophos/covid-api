import * as Knex from 'knex';

export class Login {
  doCustomerLogin(db: Knex, username: string, password: string) {
    return db('customers as c')
      .select('c.customer_id', 'c.first_name', 'c.last_name', 'd.department_name')
      .leftJoin('departments as d', 'd.department_id', 'c.department_id')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }

  doTechnicianLogin(db: Knex, username: string, password: string) {
    return db('technicians as t')
      .select('t.technician_id', 't.first_name', 't.last_name')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }
}