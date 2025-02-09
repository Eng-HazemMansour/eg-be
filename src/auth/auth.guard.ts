import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { token } = request.body; // Expect token in body

    if (!token) {
      throw new UnauthorizedException('Access denied. No token provided.');
    }

    try {
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}` || 'secret');
      request.user = decoded; // Attach user to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
