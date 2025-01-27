import NavBar from "@/components/NavBar"

export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col justify-center items-center">
            {children}
        </div>
    )
}
