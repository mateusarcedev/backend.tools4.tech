import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) { }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { userId, toolId } = createFavoriteDto;

    const toolExists = await this.prisma.tool.findUnique({ where: { id: toolId } });

    if (!toolExists) {
      throw new Error('Tool not found');
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

  async checkFavorite(userId: number, toolId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        toolId,
      },
    });
    return { isFavorite: !!favorite };
  }

  async toggleFavorite(userId: number, toolId: string) {
    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        toolId,
      },
    });

    if (existingFavorite) {
      await this.prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return { isFavorite: false };
    } else {
      await this.prisma.favorite.create({
        data: { userId, toolId },
      });
      return { isFavorite: true };
    }
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