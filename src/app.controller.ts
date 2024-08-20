import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './_core/guards/auth.guard';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
