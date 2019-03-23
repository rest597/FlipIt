import { Mongoose, Connection } from 'mongoose';
import { IGameModel, IScoreModel } from './models/model';
import { IGame } from './interfaces/game';
import { gameSchema } from './schemas/game';
import { scoreSchema } from './schemas/score';
import { IScore } from './interfaces/score';

export class Database {
  private static connection: Connection;

  public static init(mongodbConnectionString: string) {
    let mongoose = new Mongoose();
    mongoose.Promise = require('bluebird');

    Database.connection = mongoose.createConnection(mongodbConnectionString);
  }

  public static createGame(game: IGame): Promise<IGameModel> {
    let Game = Database.connection.model<IGameModel>('Game', gameSchema);
    return new Game(game).save();
  }

  public static getGame(token: string): Promise<IGameModel> {
    let Game = Database.connection.model<IGameModel>('Game', gameSchema);
    return Game.findOne({ token: token }).exec();
  }

  public static deleteGame(token: string): Promise<any> {
    let Game = Database.connection.model<IGameModel>('Game', gameSchema);
    return Game.deleteOne({ token: token }).exec();
  }

  public static createScore(score: IScore): Promise<IScoreModel> {
    let Score = Database.connection.model<IScoreModel>('Score', scoreSchema);
    return new Score(score).save();
  }

  public static getHighScore(): Promise<IScoreModel[]> {
    let Score = Database.connection.model<IScoreModel>('Score', scoreSchema);
    return Score.find().sort({seconds: 1}).limit(20).exec();
  }

}
