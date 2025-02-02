import { ChevronLeft } from 'lucide-react'

export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <button className="burger-button">
                <ChevronLeft size={44} />
            </button>
            {children}
r        </>
    )
}
