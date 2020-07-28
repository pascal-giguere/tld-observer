import { Request, Response } from 'express';
import { Service } from '@services/Service';

export class RootService extends Service {
  get = async (req: Request, res: Response): Promise<void> => {
    res.send('TLD Observer API');
  };
}
