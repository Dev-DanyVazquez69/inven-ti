import { z } from "zod";

export const manufacturerSchema = z.object({
    name: z.string().min(1, "o nome é obrigatório"),
})