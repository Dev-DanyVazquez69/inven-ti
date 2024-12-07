import { z } from 'zod';

export const devicePostSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    sectorId: z.string().cuid().nullish(),
    collaboratorId: z.string().cuid().nullable(),
    image: z.string().nullish(),
    description: z.string().nullish(),
    registerNumber: z.coerce.number().int().nullish(),
    manufacturerId: z.coerce.number().int().nullish(),
    ownerId: z.coerce.number().int().nullish(),
    typeDeviceId: z.coerce.number().int(),
});

export const deviceGetSchema = z.object({
    collaboratorId: z.string().cuid().optional(),
    sectorId: z.string().cuid().optional(),
    manufacturerId: z.coerce.number().int().optional(),
    ownerId: z.coerce.number().int().optional()
})

export const deviceUpdateSchema = z.object({
    name: z.string().optional(),
    sectorId: z.string().cuid().optional(),
    collaboratorId: z.string().cuid().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    registerNumber: z.number().int().optional(),
    manufacturerId: z.number().int().optional(),
    ownerId: z.number().int().optional()
});