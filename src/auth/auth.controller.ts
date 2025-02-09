import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; name: string; password: string }) {
    return this.authService.signup(body.email, body.name, body.password);
  }

  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('profile')
  @UseGuards(AuthGuard) // Protect this route
  async getProfile(@Req() req) {
    return {
      email: req.user.email,
    };
  }
}
