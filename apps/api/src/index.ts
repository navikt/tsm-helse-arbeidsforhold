import { Elysia } from 'elysia'

new Elysia()
    .get('/', () => 'Hello Elysia')
    .get('/arbeidsforhold', ({ headers }) => headers['X-Fnr'])
    .get('/internal/is_alive', () => ({ status: 'ok' }))
    .get('/internal/is_ready', () => ({ status: 'ok' }))
    .onStart(() => {
        // eslint-disable-next-line no-console
        console.log(`Server started on port ${Bun.env.PORT ?? 3000}`)
    })
    .listen(Bun.env.PORT ?? 3000)
