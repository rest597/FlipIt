import { Model, Document } from 'mongoose';

import { IGame } from '../interfaces/game';
import { IScore } from '../interfaces/score';

export interface IGameModel extends IGame, Document {}

export interface IScoreModel extends IScore, Document {}
