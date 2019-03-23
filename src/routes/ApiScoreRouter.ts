import { Router, Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { celebrate as joiValidator, errors } from 'celebrate';

export class ApiScoreRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public submitScore(req: Request, res: Response, next: NextFunction) {
    const temp = {
      position: 0
    };

    res
      .status(200)
      .json(temp)
      .send();
  }

  public getHighscores(req: Request, res: Response, next: NextFunction) {
    const temp = [
      {
        steps: 0,
        seconds: 0,
        name: 'string'
      }
    ];

    res
      .status(200)
      .json(temp)
      .send();
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
