/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: {
      statusCode: 429,
      message: 'Too many requests, please try again later.',
    },
    headers: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
