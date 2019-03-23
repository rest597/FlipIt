import { Router, Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { celebrate as joiValidator, errors } from 'celebrate';

export class ApiGameRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getRandomSetOfCards(req: Request, res: Response, next: NextFunction) {
    const temp = {
      pictures: ['string'],
      token: 'string'
    };

    res
      .status(200)
      .json(temp)
      .send();
  }

  init() {
    this.router.get(
      '/:size',
      joiValidator({
        params: Joi.object({
          name: Joi.number() // TODO validate even
            .integer()
            .max(32)
            .required()
        })
      }),
      this.getRandomSetOfCards
    );
  }
}

export default new ApiGameRouter().router;
