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
        name: string
        given_name: string
        middle_name: string
        family_name: string
        'helseid://claims/identity/pid': string
        'helseid://scopes/identity/pid_pseudonym': string
        'helseid://scopes/identity/assurance_level': string
        'helseid://scopes/identity/security_level': string
        'helseid://scopes/identity/network': string
        'helseid://scopes/hpr/hpr_number': string
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

        profile: (profile: HelseIdProfile) => {
            return {
                id: profile['helseid://claims/identity/pid'],
                name: profile.name,
            }
        },
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
