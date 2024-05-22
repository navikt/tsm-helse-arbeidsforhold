import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { naisController, naisIgnorePattern } from './plugins/nais.ts'
import { arbeidsforholdController } from './arbeidsforhold/controller.ts'

new Elysia()
    .use(
        swagger({
            path: '/swagger',
            exclude: [naisIgnorePattern],
        }),
    )
    .use(naisController)
    .use(arbeidsforholdController)
    .onStart(() => {
        // eslint-disable-next-line no-console
        console.log(`Server started on port ${Bun.env.PORT ?? 3000}`)
    })
    .listen(Bun.env.PORT ?? 3000)
