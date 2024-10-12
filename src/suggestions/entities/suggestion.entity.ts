import { Sugestion, SuggestionStatus } from '@prisma/client';

export class SuggestionEntity implements Sugestion {
  id: string;
  name: string;
  link: string;
  iconUrl: string;
  description: string;
  categoryId: string;
  userId: string;
  toolId: string;
  status: SuggestionStatus;
  date: Date;

  constructor(partial: Partial<SuggestionEntity>) {
    Object.assign(this, partial);
  }
}
