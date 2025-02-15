import BackButton from "@/components/RouterBack";

export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <BackButton />
            {children}
        </>
    )
}
