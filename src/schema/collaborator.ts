import { z } from "zod";

export const collaboratorUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    imageProfile: z.string().min(1).optional(),
    clientId: z.string().cuid().optional(),
    sectorId: z.string().cuid().optional(),
})

export const collaboratorPostSchema = z.object({
    name: z.string().min(1, "o nome do Colaborador é obrigatório"),
    imageProfile: z.string().min(1).optional().nullish(),
    sectorId: z.string().min(1, "O setor do colaborador é obrigatório").cuid(),
})