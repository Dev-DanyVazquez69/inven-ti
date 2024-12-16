import { z } from "zod";

export const sectorSchema = z.object({
    name: z.string().min(1, "o nome do setor é obrigatório"),
    coordinator: z.string().min(1).nullish().optional(),
})