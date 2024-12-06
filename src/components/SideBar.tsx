'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";

export default function SideBar(props: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={`nav-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="nav-sidebar-head">
                    <Logo />
                </div>
                <div className="nav-sidebar-body">
                    {props.children}
                </div>
                <div className="nav-sidebar-footer">
                    Footer Component
                </div>
            </div>
            <button 
                className={`nav-sidebar-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
        </>
    )
}