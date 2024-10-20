import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tool, SuggestionStatus } from '@prisma/client';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) { }

  // Cria uma nova sugestão
  async create(createSuggestionDto: CreateSuggestionDto) {
    return this.prisma.sugestion.create({
      data: {
        name: createSuggestionDto.name,
        link: createSuggestionDto.link,
        description: createSuggestionDto.description,
        categoryId: createSuggestionDto.categoryId,
        status: SuggestionStatus.PENDING,
      },
    });
  }


  async findAll() {
    return this.prisma.sugestion.findMany();
  }


  async findOne(id: string) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });
    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }
    return suggestion;
  }


  async approveSuggestion(id: string) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });

    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }


    const newTool = await this.prisma.tool.create({
      data: {
        name: suggestion.name,
        link: suggestion.link,
        description: suggestion.description,
        categoryID: suggestion.categoryId,
      },
    });


    await this.prisma.sugestion.update({
      where: { id },
      data: { status: SuggestionStatus.APPROVED, toolId: newTool.id },
    });

    return newTool;
  }


  async update(id: string, updateSuggestionDto: UpdateSuggestionDto) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });
    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }

    return this.prisma.sugestion.update({
      where: { id },
      data: {
        name: updateSuggestionDto.name,
        link: updateSuggestionDto.link,
        description: updateSuggestionDto.description,
        categoryId: updateSuggestionDto.categoryId,

      },
    });
  }


  async remove(id: string) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });
    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }
    return this.prisma.sugestion.delete({ where: { id } });
  }
}
