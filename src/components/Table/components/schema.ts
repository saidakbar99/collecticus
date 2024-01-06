import { z } from "zod"

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    isAdmin: z.boolean(),
    isBlocked: z.boolean(),
    lastLogin: z.date(),
    createdAt: z.date(),
})

export type User = z.infer<typeof userSchema>