import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { 'XSRF-TOKEN': xsrfToken } = req.cookies;

    if (!xsrfToken) {
      res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
    }

    next();
  }
}
