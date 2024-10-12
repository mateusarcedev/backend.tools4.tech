import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) { }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { userId, toolId } = createFavoriteDto;

    const userExists = await this.prisma.user.findUnique({ where: { githubId: userId } });
    const toolExists = await this.prisma.tool.findUnique({ where: { id: toolId } });

    if (!userExists || !toolExists) {
      throw new Error('User or Tool not found');
    }

    return this.prisma.favorite.create({
      data: { userId, toolId },
    });
  }

  findAll() {
    return this.prisma.favorite.findMany();
  }

  findOne(id: string) {
    return this.prisma.favorite.findUnique({ where: { id } });
  }

  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return this.prisma.favorite.update({
      where: { id },
      data: updateFavoriteDto,
    });
  }

  remove(id: string) {
    return this.prisma.favorite.delete({ where: { id } });
  }
}
