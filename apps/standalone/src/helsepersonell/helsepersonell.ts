import { requestAzureClientCredentialsToken } from '@navikt/oasis'
import { logger } from '@navikt/next-logger'

export async function getHelsepersonellInfo(hpr: string) {
    if (process.env.NODE_ENV !== 'production') {
        return { ok: false, error: "we're local" }
    }

    const clientCreds = await requestAzureClientCredentialsToken(
        'api://dev-gcp.teamsykmelding.syfohelsenettproxy/.default',
    )
    if (!clientCreds.ok) {
        throw new Error('Unable to authenticate with Azure AD', { cause: clientCreds.error })
    }

    const response = await fetch('http://syfohelsenettproxy.teamsykmelding/api/v2/behandlerMedHprNummer', {
        headers: {
            Authorization: `Bearer ${clientCreds.token}`,
            hprNummer: hpr,
        },
    })

    if (!response.ok) {
        const body = await response.text()
        logger.error(`syfohelsenettproxy not happy :( ${response.status} ${response.statusText}, body: ${body}`)
        return { ok: false, error: `HPR Proxy says: ${response.status} ${response.statusText} (${body})` }
    }

    return { ok: true, behandler: await response.json() }
}
