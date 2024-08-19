import {
  Controller,
  Get,
  NotFoundException,
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
import { PostService } from './post.service';
import { User } from 'src/_core/decorators/user.decorator';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Public()
  @Get('all-posts')
  async gelAllPosts() {
    const res = await this.postService.getAllPosts();
    return res;
  }

  @Get('user')
  async getCurrentUserPost(@User() user: any) {
    const res = await this.postService.getCurrentUserPost(user);
    return res;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file, @User() user: any) {
    const res = this.postService.addImage(user, file);
    return { data: true };
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
    try {
      const files = readdirSync('./uploads');
      const imageUrls = files.map((file) => ({
        filename: file,
        url: `http://192.168.1.4:4001/v1/posts/image/${file}`,
      }));
      return {
        data: {
          images: imageUrls,
        },
      };
    } catch (err) {
      throw new NotFoundException('image Not Found');
    }
  }
}
