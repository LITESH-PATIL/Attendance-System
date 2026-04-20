import z from 'zod';

export const isValidUserCreationInput = z.object({
    name: z.string().min(5),
    email: z.email(),
    password: z.string().min(8),
    role: z.literal('teacher').or(z.literal('student')) 

})

export const isValidUserSessionInput = z.object({
    email: z.email(),
    password: z.string()
})
