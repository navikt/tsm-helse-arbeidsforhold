import React, { ReactElement, Suspense } from 'react'
import ExampleSection from '../components/ExampleSection'
import ExampleData from '../components/ExampleData'
import ExampleMutation from '../components/mutation/ExampleMutation'

export const dynamic = 'force-dynamic'

export default async function Page(): Promise<ReactElement> {
    return (
        <main className="p-8">
            <Suspense>
                <ExampleSection />
            </Suspense>
            <Suspense>
                <ExampleData />
            </Suspense>
            <ExampleMutation />
        </main>
    )
}
