import { z } from "zod";

export const sectorUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    coordinator: z.string().min(1).optional(),
    clientId: z.string().cuid().optional(),
})

export const sectorPostSchema = z.object({
    name: z.string().min(1, "o nome do setor é obrigatório"),
    coordinator: z.string().min(1).nullish(),
})