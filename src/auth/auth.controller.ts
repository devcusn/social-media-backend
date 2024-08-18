import { Body, Controller, Post, Put } from '@nestjs/common';

import { UserLoginDto, UserRegisterDto } from './models/dto';
import { AuthService } from './auth.service';
import { hashPassword, checkPassword } from 'src/utils/hash-passord';
import { Public } from 'src/_core/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('/login')
  async login(@Body() data: UserLoginDto) {
    const res = await this.authService.loginUser(data);
    return res;
  }
  @Public()
  @Post('/register')
  async register(@Body() data: UserRegisterDto) {
    const res = await this.authService.createUser(data);
    return res;
  }
  //test hash password
  @Post('/hashPassword')
  async hasPassword(@Body() data: UserRegisterDto) {
    const hashedPassword = await hashPassword('hello');
    return hashedPassword;
  }
  @Post('/checkPassword')
  async checkPasword(@Body() data: UserRegisterDto) {
    const hashedPassword = await checkPassword(
      'hello',
      '$2b$10$tbOgcFtHcjp1qHwTtmPiP.4vO60N6yt80tc1xpRORAyysanPJZvfq',
    );
    return hashedPassword;
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
