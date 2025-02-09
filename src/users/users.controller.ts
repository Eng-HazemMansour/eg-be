import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req) {
    return { email: req.user.email, name: req.user.name };
  }
}
