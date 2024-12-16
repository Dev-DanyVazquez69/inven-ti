import { z } from "zod";

export const typeDeviceSchema = z.object({
    name: z.string().min(1, "o nome é obrigatório"),
})