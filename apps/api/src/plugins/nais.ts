import Elysia from 'elysia'

export const naisController = new Elysia({
    name: 'nais',
})
    .get('/internal/is_alive', () => ({ status: 'ok' }))
    .get('/internal/is_ready', () => ({ status: 'ok' }))

export const naisIgnorePattern = /\/internal\//
