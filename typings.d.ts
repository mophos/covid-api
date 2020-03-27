import * as Knex from 'knex';

declare module 'express' {
  interface Request {
    db: any // Actually should be something like `multer.Body`
    dbEocDms: any
    knex: Knex
    decoded: any // Actually should be something like `multer.Files`
  }
}