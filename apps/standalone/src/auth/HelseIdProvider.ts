import type { Provider } from 'next-auth/providers'

type HelseIdProvider = {
    issuer: string
    clientId: string
    privateKey: CryptoKey
    scopes: string[]
}

export function HelseID({ issuer, clientId, privateKey, scopes }: HelseIdProvider): Provider {
    type HelseIdProfile = {
        iss: string
        nbf: number
        iat: number
        exp: number
        aud: string
        amr: string[]
        at_hash: string
        sid: string
        sub: string
        auth_time: number
        idp: string
        'helseid://claims/identity/pid': string
        name: string
        given_name: string
        middle_name: string
        family_name: string
    }

    return {
        id: 'helse-id',
        name: 'HelseID',
        type: 'oidc',
        issuer: issuer,
        clientId: clientId,
        client: { token_endpoint_auth_method: 'private_key_jwt' },
        token: { clientPrivateKey: privateKey },
        authorization: { params: { scope: `openid profile ${scopes.join(' ')}` } },
        profile: (profile: HelseIdProfile) => ({
            id: profile['helseid://claims/identity/pid'],
            name: profile.name,
            email: profile.sub,
        }),
    }
}

export async function getPrivateKey(privateJwk: object): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        'jwk',
        privateJwk,
        {
            name: 'RSA-PSS',
            hash: { name: 'SHA-256' },
        },
        true,
        ['sign'],
    )
}
