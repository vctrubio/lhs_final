'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

function NavPlayground() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`nav-playground ${isOpen ? 'open' : ''}`}>
                <div className="nav-playground-head">
                    Head Component
                </div>
                <div className="nav-playground-body">
                    Body Component
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
            <NavPlayground />
            <main>
                {children}
            </main>
        </>
    )
}
