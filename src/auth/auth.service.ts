import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { checkPassword, hashPassword } from 'src/utils/hash-passord';
import { PrismaService } from 'src/_core/prisma/prisma.service';
import { UserRegisterDto, UserLoginDto } from './models/dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async loginUser(data: UserLoginDto) {
    const userRes = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (userRes) {
      const { password, ...jwtData } = userRes;
      const checkedPassword = await checkPassword(data.password, password);
      if (checkedPassword) {
        return {
          statusCode: HttpStatus.OK,
          data: {
            username: userRes.username,
            access_token: await this.jwtService.signAsync(jwtData),
          },
          message: 'User can access',
        };
      } else {
        throw new NotFoundException('Check the login information');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }
  async createUser(data: UserRegisterDto) {
    const hashedPassword = await hashPassword(data.password);
    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: hashedPassword,
          profile: {
            create: {},
          },
        },
      });
      return { status: true };
    } catch (err) {
      throw new ConflictException('User already exists!');
    }
  }
  async checkUser() {
    try {
      const res = this.prisma.user.findFirst({
        where: {
          email: 'asdfas',
        },
      });
      return res;
    } catch (err) {}
  }

  async updatePassword() {
    try {
      console.log('hellooo');
    } catch (err) {
      console.log('');
    }
  }
}
