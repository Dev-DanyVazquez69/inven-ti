import { z } from 'zod';

export const devicePostSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    sectorId: z.string().min(1, 'O Id do setor é obrigatório').cuid(),
    collaboratorId: z.string().min(1, 'O Id do colaborador é obrigatório').cuid(),
    image: z.string().nullish(),
    description: z.string().nullish(),
    clientId: z.string().min(1, 'O Id do cliente é obrigatório').cuid(),
    registerNumber: z.number().int().nullish(),
    manufacturerId: z.number().int().nullish(),
    ownerId: z.number().int().nullish()
});

export const deviceGetSchema = z.object({
    collaboratorId: z.string().cuid().optional(),
    sectorId: z.string().cuid().optional(),
    manufacturerId: z.coerce.number().int().optional(),
    ownerId: z.coerce.number().int().optional()
})