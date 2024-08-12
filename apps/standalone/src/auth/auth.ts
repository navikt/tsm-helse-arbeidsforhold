import NextAuth, { NextAuthResult } from 'next-auth'

import { getAuthEnv } from '../env'
import { getPrivateKey, HelseID } from './HelseIdProvider'
import { logger } from '@navikt/next-logger'

const nextAuth: NextAuthResult = NextAuth(async () => {
    const authEnv = getAuthEnv()

    return {
        debug: true,
        trustHost: true,
        logger: {
            warn: (code) => logger.warn(`authjs: warning: ${code}`),
            error: (error) => logger.error(error),
            debug: (message, metadata) => logger.debug(`authjs: ${message}, ${JSON.stringify(metadata)}`),
        },
        providers: [
            HelseID({
                issuer: authEnv.AUTH_ISSUER,
                clientId: authEnv.AUTH_CLIENT_ID,
                privateKey: await getPrivateKey(authEnv.AUTH_PRIVATE_JWK),
                scopes: ['helseid://scopes/identity/pid'],
            }),
        ],
        callbacks: {
            // Login all unauthenticated users
            authorized: async ({ auth }) => !!auth,
        },
    }
})

const signIn: NextAuthResult['signIn'] = nextAuth.signIn
const signOut: NextAuthResult['signOut'] = nextAuth.signOut
const auth: NextAuthResult['auth'] = nextAuth.auth
const handlers = nextAuth.handlers

export { signIn, signOut, auth, handlers }
