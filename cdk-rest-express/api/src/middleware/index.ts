import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => any;
const allowOrigins = process.env.CORS_ALLOW_ORIGINS ?? '*';

export const cors: Middleware = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowOrigins);
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
