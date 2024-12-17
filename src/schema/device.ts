import { z } from 'zod';

export const devicePostSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    sectorId: z.string().cuid(),
    collaboratorId: z.string().cuid(),
    image: z.string().nullish(),
    description: z.string().nullish(),
    registerNumber: z.coerce.number().int().nullish(),
    manufacturerId: z.coerce.number().int(),
    ownerId: z.coerce.number().int(),
    typeDeviceId: z.coerce.number().int(),
});

export const deviceGetSchema = z.object({
    collaboratorId: z.string().cuid().optional(),
    sectorId: z.string().cuid().optional(),
    manufacturerId: z.coerce.number().int().optional(),
    ownerId: z.coerce.number().int().optional()
})

export const deviceUpdateSchema = z.object({
    name: z.string(),
    sectorId: z.string().cuid(),
    collaboratorId: z.string().cuid(),
    image: z.string().nullish(),
    description: z.string().nullish(),
    registerNumber: z.coerce.number().int().nullish(),
    manufacturerId: z.coerce.number().int(),
    ownerId: z.coerce.number().int(),
    typeDeviceId: z.coerce.number().int()
});