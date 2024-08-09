import { cn } from './tw'
import { ReactNode, ReactElement } from 'react'
import { Heading, BodyShort, Detail } from '@navikt/ds-react'

export function Card({
    className,
    title,
    children,
    detail,
}: {
    className?: string
    title: string
    children: ReactNode
    detail?: string
}): ReactElement {
    return (
        <div className={cn('border-2 p-4 mt-8 border-border-subtle rounded m-4', className)}>
            <Heading size="small" level="3" spacing>
                {title}
            </Heading>
            <BodyShort>{children}</BodyShort>
            {detail && <Detail>{detail}</Detail>}
        </div>
    )
}
