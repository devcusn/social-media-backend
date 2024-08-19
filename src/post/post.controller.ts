import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Public } from 'src/_core/guards/auth.guard';

@Controller('posts')
export class PostController {
  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file) {
    console.log('file upload', file);
  }

  @Public()
  @Get('image/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', 'uploads', filename);
    res.sendFile(imagePath);
  }
  @Public()
  @Get('all')
  async getAllImages() {
    const files = readdirSync('./uploads');
    const imageUrls = files.map((file) => ({
      filename: file,
      url: `http://localhost:4001/v1/posts/image/${file}`,
    }));
    return {
      data: {
        images: imageUrls,
      },
    };
  }
}
