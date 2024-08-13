'use server'

import { getToken } from 'next-auth/jwt'
import { auth } from '../../auth/auth'
import { getOboToken } from '../../auth/obo'

export async function serverActionExample() {
    const session = await auth()

    if (session == null) {
        return {
            ok: false,
            message: 'Unauthorized',
        }
    }

    const obo = await getOboToken(session.token, ['nhn:phr/mhd/read-document'])
    console.log('obo!', obo)

    return {
        ok: true,
        message: `Hello ${session.user.name}`,
        obo,
    }
}
