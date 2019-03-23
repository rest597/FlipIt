import { Router, Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { celebrate as joiValidator, errors } from 'celebrate';
import { Database } from '../mongodb/Database';
import Error from '../services/ErrorManager';

export class ApiScoreRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public submitScore(req: Request, res: Response, next: NextFunction) {
    Database.getGame(req.body.token)
      .then(data => {
        if (data == null) {
          next(new Error(400, 'Invalid input'));
          return;
        }

        Database.deleteGame(req.body.token);

        Database.createScore({
          seconds: req.body.seconds,
          steps: req.body.steps,
          name: req.body.name
        })
          .then(() => {
            const ret = {
              position: 1
            };

            res
              .status(200)
              .json(ret)
              .send();
          })
          .catch(() => {
            next(new Error(500, 'Internal error'));
            return;
          });

        const ret = {
          position: 1
        };

        res
          .status(200)
          .json(ret)
          .send();
      })
      .catch(() => {
        next(new Error(400, 'Invalid input'));
        return;
      });
  }

  public getHighscores(req: Request, res: Response, next: NextFunction) {
    Database.getHighScore()
      .then(data => {
        res
          .status(200)
          .json(data)
          .send();
      })
      .catch(err => {
        next(new Error(400, 'Invalid input'));
        return;
      });
  }

  init() {
    this.router.post(
      '/',
      joiValidator({
        body: Joi.object({
          steps: Joi.number()
            .integer()
            .required(),
          seconds: Joi.number()
            .integer()
            .required(),
          name: Joi.string().required(),
          token: Joi.string().required()
        })
      }),
      this.submitScore
    );
    this.router.get('/', this.getHighscores);
  }
}

export default new ApiScoreRouter().router;
