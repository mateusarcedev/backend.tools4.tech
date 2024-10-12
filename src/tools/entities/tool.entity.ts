import { Tool } from '@prisma/client';

export class ToolEntity implements Tool {
  id: string;
  name: string;
  link: string;
  iconUrl: string;
  description: string;
  categoryID: string;
  suggestedBy: string; // Deve ser uma propriedade obrigatória

  constructor(partial: Partial<ToolEntity>) {
    Object.assign(this, partial);
  }
}
