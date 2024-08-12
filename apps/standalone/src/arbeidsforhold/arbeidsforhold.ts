import { logger } from '@navikt/next-logger'

type Arbeidsforhold = {
    arbeidsgiver: {
        navn: string
        organisasjonsnummer: string
    }
    stilling: string
}

type ArbeidsforholdResponse = {
    ok: true
    arbeidsforhold: Arbeidsforhold[]
}

type ArbeidsforholdError = {
    ok: false
    error: string
}

const API_URL = process.env.NODE_ENV === 'production' ? 'http://helse-arbeidsforhold-api' : 'http://localhost:5000'

export async function getArbeidsforhold(): Promise<ArbeidsforholdResponse | ArbeidsforholdError> {
    const response = await fetch(`${API_URL}/arbeidsforhold`, {
        headers: { 'Content-Type': 'application/json', 'X-fnr': '12345678918' },
    })

    if (!response.ok) {
        logger.error(`Failed to fetch arbeidsforhold, ${response.status} ${response.statusText}`)
        return {
            ok: false,
            error: 'Klarte ikke å hente arbeidsforhold',
        }
    }

    return { ok: true, arbeidsforhold: await response.json() }
}
