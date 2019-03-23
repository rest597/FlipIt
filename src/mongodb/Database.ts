import { Mongoose, Connection } from 'mongoose';

export class Database {
  private static connection: Connection;

  public static init(mongodbConnectionString: string) {
    let mongoose = new Mongoose();
    mongoose.Promise = require('bluebird');

    Database.connection = mongoose.createConnection(mongodbConnectionString);
  }
}
