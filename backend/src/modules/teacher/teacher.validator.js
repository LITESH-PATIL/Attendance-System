import { z } from "zod";

export const isValidClassCreationInput = z.object({
    className: z.string().min(3)
});
