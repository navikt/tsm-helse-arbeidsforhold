/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ['@repo/ui'],
    output: 'standalone',
    experimental: {
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
        instrumentationHook: true,
    },
}
