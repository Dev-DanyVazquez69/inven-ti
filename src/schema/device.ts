import { z } from 'zod';

export const devicePostSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    sectorId: z.string().min(1, 'O Id do setor é obrigatório').cuid(),
    collaboratorId: z.string().min(1, 'O Id do colaborador é obrigatório').cuid(),
    image: z.string().nullish(),
    description: z.string().nullish(),
    clientId: z.string().min(1, 'O Id do cliente é obrigatório').cuid(),
    registerNumber: z.number().int().nullish(),
    manufacturer: z.string().nullish(),
});
