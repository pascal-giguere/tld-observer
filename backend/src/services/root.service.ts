import { Request, Response } from 'express';
import { Service } from '@services/Service';

export class RootService extends Service {
  find = {
    requireAuth: false,
    handler: async (req: Request, res: Response): Promise<void> => {
      res.send('TLD Observer API');
    },
  };
}
