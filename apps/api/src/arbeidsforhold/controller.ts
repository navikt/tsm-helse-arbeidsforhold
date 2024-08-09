import Elysia, { t } from 'elysia'

export const arbeidsforholdController = new Elysia({
    name: 'arbeidsforhold',
}).get(
    '/arbeidsforhold',
    ({ headers }) => {
        return [
            {
                fnr: headers['x-fnr'],
                arbeidsgiver: {
                    navn: 'Arbeidsbedrift AS',
                    organisasjonsnummer: '123456789',
                },
                stilling: 'Medarbeider',
            },
            {
                fnr: headers['x-fnr'],
                arbeidsgiver: {
                    navn: 'Helso og Arbeido Inc.',
                    organisasjonsnummer: '98237123',
                },
                stilling: 'Varehusassistent',
            },
        ]
    },
    {
        headers: t.Object({
            'x-fnr': t.String({
                description: 'Fødselsnummer til bruker som forespør arbeidsforhold',
                minLength: 11,
                maxLength: 11,
            }),
        }),
        response: t.Array(
            t.Object({
                fnr: t.String(),
                arbeidsgiver: t.Object({
                    navn: t.String(),
                    organisasjonsnummer: t.String(),
                }),
                stilling: t.String(),
            }),
        ),
    },
)
