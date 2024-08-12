'use server'

import { auth } from '../../auth/auth'

export async function serverActionExample() {
    const session = await auth()

    if (!session) {
        return {
            ok: false,
            message: 'Unauthorized',
        }
    }

    console.log(JSON.stringify(session))

    return {
        ok: true,
        message: `Hello ${session.user.name}`,
    }
}
