'use client'
import SideBar from "@/components/SideBar";

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SideBar>
                <div>Hello World</div>
            </SideBar>
            <main>
                {children}
            </main>
        </>
    )
}
