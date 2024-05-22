import { cn } from './tw'

export function Card({
    className,
    title,
    children,
}: {
    className?: string
    title: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <div className={cn('border-2 mt-8 border-border-subtle rounded m-4', className)}>
            <h2>
                Ayy {title} <span>-&gt;</span>
            </h2>
            <p>{children}</p>
        </div>
    )
}
