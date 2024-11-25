import { z } from "zod";

export const collaboratorUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    imageProfile: z.string().min(1).optional(),
    clientId: z.string().cuid().optional(),
    sectorId: z.string().cuid().optional(),
})

export const collaboratorPostSchema = z.object({
    name: z.string().min(1, "o nome do setor é obrigatório"),
    imageProfile: z.string().min(1).optional(),
    sectorId: z.string().cuid(),
})