import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_core/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async getAllPosts() {
    const res = await this.prisma.post.findMany();
    return res;
  }
  async getCurrentUserPost(user) {
    const res = await this.prisma.post.findMany({
      where: {
        authorId: user.id,
      },
    });
    return res;
  }
  async addImage(user, file) {
    console.log(user.id);
    const res = await this.prisma.post.create({
      data: {
        title: file.filename,
        content: 'it is image description',
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return {
      status: true,
    };
  }
}
