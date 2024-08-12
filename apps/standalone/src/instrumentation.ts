export async function register(): Promise<void> {
    // This is an internal env controlled by next, not relevant for turborepo
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await require('pino')
        await require('next-logger')
    }
}
