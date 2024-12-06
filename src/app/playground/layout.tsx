'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";

function NavPlayground(props: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={`nav-playground ${isOpen ? 'open' : ''}`}>
                <div className="nav-playground-head">
                    <Logo />
                </div>
                <div className="nav-playground-body">
                    {props.children}
                </div>
                <div className="nav-playground-footer">
                    Footer Component
                </div>
            </div>
            <button 
                className={`nav-playground-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
        </>
    )
}

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavPlayground>
                <div>Hello World</div>
            </NavPlayground>
            <main>
                {children}
            </main>
        </>
    )
}
