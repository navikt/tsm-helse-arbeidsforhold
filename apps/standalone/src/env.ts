import { z } from 'zod'

const authEnv = z.object({
    AUTH_ISSUER: z.string(),
    AUTH_CLIENT_ID: z.string(),
    AUTH_PRIVATE_JWK: z.string().transform((it) => JSON.parse(it)),
})

export function getAuthEnv() {
    return authEnv.parse(process.env)
}
