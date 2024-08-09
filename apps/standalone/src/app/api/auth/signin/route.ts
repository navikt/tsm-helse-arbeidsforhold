import { signIn } from '../../../../auth/auth'

export async function GET(req: Request) {
    const searchParams = new URL(req.url).searchParams

    return signIn('helse-id', { redirectTo: searchParams.get('callbackUrl') ?? '' })
}
