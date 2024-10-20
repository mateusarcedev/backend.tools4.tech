import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) { }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { userId, toolId } = createFavoriteDto;

    // Remove user verification
    const toolExists = await this.prisma.tool.findUnique({ where: { id: toolId } });

    if (!toolExists) {
      throw new Error('Tool not found');
    }

    return this.prisma.favorite.create({
      data: { userId, toolId }, // Use userId directly as Int
    });
  }

  findAll() {
    return this.prisma.favorite.findMany();
  }

  findOne(id: string) {
    return this.prisma.favorite.findUnique({ where: { id } });
  }

  async findByUserAndTool(userId: number, toolId: string) { // Change userId type to number
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId, // Use userId directly
        toolId,
      },
    });
    return { isFavorite: !!favorite };
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
