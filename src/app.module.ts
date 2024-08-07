import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth/auth.controller';
import { AuthService } from './auth/auth/auth.service';
import { AuthModule } from './auth/auth/auth.module';
import { PrismaService } from './core/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
