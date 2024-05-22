import { Card } from '@repo/ui/card'
import { Button } from '@navikt/ds-react'

export default function Page(): JSX.Element {
    return (
        <main>
            <div className="bg-red-500">Hey I'm standalone</div>
            <Card title="Helllo">Okay</Card>
            <Button>Aksel button!</Button>
        </main>
    )
}
