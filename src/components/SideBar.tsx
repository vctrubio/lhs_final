'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";
import { Slider } from "@mui/material"
import { useSharedQueryState } from "#/backend/nuqs";

function SB() {
    return (
        <div className="flex border h-full">
            <div className="border">l</div>
            <div className="border">h</div>
            <div className="border">s</div>
        </div>
    )
}


interface SliderProp {
    title: string;
    value: number;
    step: number;
}

function RenderSlider(ptr: SliderProp) {

    return (
        <div className="flex flex-col py-2">
            <div className="flex flex-row justify-between items-center px-2">
                <h2>{ptr.title}</h2>
                <div>icon</div>
            </div>
            <div className="px-4">
                <Slider
                    value={ptr.value}
                    // onChange={(e, value) => onChange(value)}
                    step={ptr.step}
                    style={{
                        color: 'var(--color-green-dark)',
                    }} />
            </div>
        </div>
    )
}


function SidebarContent() {
    const [query, setQuery] = useState('');

    const testSlider: SliderProp = { title: 'helloworlsd', value: 0, step: 1 };

    return (
        <div>
            <div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="heloworld"
                />
            </div>
            <div className="border">
                <RenderSlider {...testSlider}/>
            </div>
        </div>
    );
}

export default function SideBar() {
    // const nuqs = useSharedQueryState()
    // console.log('hello nuqs...', nuqs)

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={`nav-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="nav-sidebar-head">
                    <Logo />
                </div>
                <div className="nav-sidebar-body">
                    <SidebarContent />
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
            {/* <SB /> */}
        </>
    )
}