import { getAuthEnv } from '../env'
import { Client, Issuer, custom } from 'openid-client'
import { logger } from '@navikt/next-logger'

let _issuer: Issuer
function getIssuer(): Issuer {
    if (!_issuer) {
        const authEnv = getAuthEnv()

        logger.info(
            `Setting up issuer with ${JSON.stringify(
                {
                    issuer: authEnv.AUTH_ISSUER,
                    token_endpoint: `${authEnv.AUTH_ISSUER}/connect/token`,
                    token_endpoint_auth_signing_alg_values_supported: ['RS256'],
                },
                null,
                2,
            )}`,
        )

        _issuer = new Issuer({
            issuer: authEnv.AUTH_ISSUER,
            token_endpoint: `${authEnv.AUTH_ISSUER}/connect/token`,
            token_endpoint_auth_signing_alg_values_supported: ['RS256'],
        })
    }

    return _issuer
}

let _client: Client
function getClient(): Client {
    if (!_client) {
        custom.setHttpOptionsDefaults({
            timeout: 5000,
        })

        const authEnv = getAuthEnv()
        const issuer = getIssuer()
        return new issuer.Client(
            {
                client_id: authEnv.AUTH_CLIENT_ID,
                token_endpoint_auth_method: 'private_key_jwt',
            },
            { keys: [authEnv.AUTH_PRIVATE_JWK] },
        )
    }

    return _client
}

export async function getOboToken(subjectToken: string, scopes: string[]) {
    const client = getClient()

    try {
        const grantResult = await client.grant({
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            subject_token: subjectToken,
            subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
            client_assertion: subjectToken,
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            scope: scopes.join(' '),
        })

        return grantResult.access_token
    } catch (e) {
        console.error('error', e)
        return null
    }
}
