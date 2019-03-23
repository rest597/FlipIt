import { Router, Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { celebrate as joiValidator, errors } from 'celebrate';
import Error from '../services/ErrorManager';
import * as sha1 from 'sha1';
import { Database } from '../mongodb/Database';

export class ApiGameRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public static getRandomCardSet(
    dataSetSize: number,
    minValue: number,
    maxValue: number
  ): Array<string> {
    return new Array(dataSetSize).fill(0).map((n: number) => {
      return (
        'http://localhost:3000/card/' +
        (Math.floor(Math.random() * maxValue) + minValue) +
        '.png'
      );
    });
  }

  public getRandomSetOfCards(req: Request, res: Response, next: NextFunction) {
    console.log(req.params);
    if (req.params.size % 2 != 0) {
      next(new Error(400, 'Invalid input'));
      return;
    }

    const gameToken = sha1(Math.random());
    Database.createGame({ token: gameToken })
      .then(() => {
        const returnObj = {
          pictures: ApiGameRouter.getRandomCardSet(req.params.size, 5, 20),
          token: gameToken
        };

        res
          .status(200)
          .json(returnObj)
          .send();
      })
      .catch(err => {
        next(err);
      });
  }

  init() {
    this.router.get(
      '/:size',
      joiValidator({
        params: Joi.object({
          size: Joi.number()
            .min(5)
            .max(20)
            .required()
        })
      }),
      this.getRandomSetOfCards
    );
  }
}

export default new ApiGameRouter().router;
