import { Controller, Get, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/_core/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}
  @Get('/login')
  async login() {
    const res = await this.prisma.user.findFirst();
    return 'login';
  }
  @Post('/register')
  async register() {
    return 'register';
  }
  @Put('/update/password')
  async updatePassword() {
    return 'update password';
  }
  @Post('/reset/password')
  async resetPasswor() {
    return 'reset password';
  }
}
