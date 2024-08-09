import NextAuth from 'next-auth'

import { getAuthEnv } from '../env'
import { getPrivateKey, HelseID } from './HelseIdProvider'

export const { handlers, signIn, signOut } = NextAuth(async () => {
    const authEnv = getAuthEnv()

    return {
        debug: true,
        trustHost: true,
        providers: [
            HelseID({
                issuer: authEnv.AUTH_ISSUER,
                clientId: authEnv.AUTH_CLIENT_ID,
                privateKey: await getPrivateKey(authEnv.AUTH_PRIVATE_JWK),
                scopes: ['helseid://scopes/identity/pid'],
            }),
        ],
    }
})
