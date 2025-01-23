
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="shadow-lg shadow-gray-500/50">
            {children}
        </div>
    )
}
