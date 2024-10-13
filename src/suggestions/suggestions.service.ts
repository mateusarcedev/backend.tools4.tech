import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto'; // Certifique-se de criar este DTO
import { UpdateSuggestionDto } from './dto/update-suggestion.dto'; // Certifique-se de criar este DTO também
import { PrismaService } from 'src/prisma/prisma.service';
import { Tool, SuggestionStatus } from '@prisma/client'; // Para uso do modelo Tool e SuggestionStatus

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) { }

  // Cria uma nova sugestão
  async create(createSuggestionDto: CreateSuggestionDto) {
    return this.prisma.sugestion.create({
      data: {
        name: createSuggestionDto.name,
        link: createSuggestionDto.link,
        iconUrl: createSuggestionDto.iconUrl,
        description: createSuggestionDto.description,
        categoryId: createSuggestionDto.categoryId,
        userId: createSuggestionDto.userId,
        status: SuggestionStatus.PENDING, // Define o status inicial como PENDING
      },
    });
  }

  // Lista todas as sugestões
  async findAll() {
    return this.prisma.sugestion.findMany({
      include: {
        user: true, // Incluir dados do usuário que fez a sugestão
      },
    });
  }

  // Encontra uma sugestão pelo ID
  async findOne(id: string) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });
    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }
    return suggestion;
  }

  // Aprova uma sugestão, criando uma nova ferramenta
  async approveSuggestion(id: string) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });

    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }

    // Cria uma nova ferramenta
    const newTool = await this.prisma.tool.create({
      data: {
        name: suggestion.name,
        link: suggestion.link,
        iconUrl: suggestion.iconUrl,
        description: suggestion.description,
        categoryID: suggestion.categoryId,
      },
    });

    // Atualiza o status da sugestão para APROVED
    await this.prisma.sugestion.update({
      where: { id },
      data: { status: SuggestionStatus.APPROVED, toolId: newTool.id }, // Associando a nova ferramenta
    });

    return newTool; // Retorna a nova ferramenta criada
  }

  // Atualiza uma sugestão existente
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
        iconUrl: updateSuggestionDto.iconUrl,
        description: updateSuggestionDto.description,
        categoryId: updateSuggestionDto.categoryId,
        // Não atualiza o userId ou o status aqui, a menos que necessário
      },
    });
  }

  // Remove uma sugestão
  async remove(id: string) {
    const suggestion = await this.prisma.sugestion.findUnique({ where: { id } });
    if (!suggestion) {
      throw new NotFoundException('Suggestion not found');
    }
    return this.prisma.sugestion.delete({ where: { id } });
  }
}
