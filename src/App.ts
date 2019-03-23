import * as express from 'express';
import * as logger from 'morgan';
import log from './services/LogManager';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
// import { isCelebrate } from 'celebrate';

import ApiGameRouter from './routes/ApiGameRouter';
import ApiScoreRouter from './routes/ApiScoreRouter';
import { Database } from './mongodb/Database';
import Error from './services/ErrorManager';



// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;

  // API version
  apiVersion: string;

  //Run configuration methods on the Express instance.
  constructor() {
    dotenv.config();

    log.info('FlipIt backend service started!');
    log.info('Environment: ' + process.env);

    this.apiVersion = process.env.API_VERSION || '/v1';

    this.express = express();
    this.middleware();

    Database.init(process.env.MONGO_CONNECTION_STRING);

    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('common'));
    this.express.use(bodyParser.json({ limit: '10mb' }));
  }

  // Global Express error handler.
  private errorHandler(
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    if (err) {
      const error: Error = err as Error;
      log.error(error.getMessage());
      res.status(error.getStatusCode()).send(error.getMessage());
    } else {
      res.status(500);
    }
  }

  // Global Express not found handler.
  private notFoundHandler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const error: Error = new Error(404, 'Operation not found');
    log.error(error.getMessage());
    res.status(error.getStatusCode()).json(error.getErrorObject());
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/api' + this.apiVersion + '/game', ApiGameRouter);
    this.express.use('/api' + this.apiVersion + '/score', ApiScoreRouter);
    this.express.use('*', this.notFoundHandler);
    this.express.use(this.errorHandler);
  }
}

export default new App().express;
