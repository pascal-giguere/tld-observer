import { Express, Request, Response } from 'express';
import { Service } from '@services/index';

export const rootService: Service = (app: Express): void => {
  app.get('/', (req: Request, res: Response): void => {
    res.send('TLD Observer API');
  });
};
