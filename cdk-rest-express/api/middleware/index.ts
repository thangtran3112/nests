import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => any;
type MiddlewareWithArg = (
  arg: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => any;
const allowOrigins = process.env.CORS_ALLOW_ORIGINS ?? '*';

export const cors: Middleware = async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowOrigins);
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

export const errorHandler: MiddlewareWithArg = (
  error: HttpError,
  req,
  res,
  next,
) => {
  const message = error.message || 'Something went wrong';
  console.error(error);
  res.status(error.status ?? 500).send({ message });
};

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number = 500,
  ) {
    super(message);
  }
}
