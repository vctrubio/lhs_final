'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";
import { Slider } from "@mui/material"
import { PropertyParams } from "#/backend/parsing";
import { INuqs } from "#/backend/nuqsv2";


function SidebarContent({ nuqs }: { nuqs: any }) {
    return (
        <div>
            {Object.keys(nuqs.sliders).map((key, index) => (
                <div key={index}>
                    <h2>{nuqs.sliders[key].title}</h2>
                    <p>value0: {nuqs.sliders[key].values[0]}</p>
                    <p>value1: {nuqs.sliders[key].values[1]}</p>
                    <p>Min: {nuqs.sliders[key].paramMin}</p>
                    <p>Max: {nuqs.sliders[key].paramMax}</p>
                    <Slider
                        value={nuqs.sliders[key].values}
                        onChange={(_, newValue) => nuqs.sliders[key].valueSet(newValue)}
                        min={nuqs.sliders[key].paramMin}
                        max={nuqs.sliders[key].paramMax}
                        marks={[{ value: nuqs.sliders[key].paramMin, label: nuqs.sliders[key].paramMin }, { value: nuqs.sliders[key].paramMax, label: nuqs.sliders[key].paramMax }]}
                        disableSwap
                    />
                </div>
            ))}
        </div>
    );
}

export default function SideBar({ propertyParams }: { propertyParams: PropertyParams }) {
    const [isOpen, setIsOpen] = useState(false);

    const nuqs = INuqs(propertyParams);

    return (
        <>
            <div className={`nav-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="nav-sidebar-head">
                    <Logo />
                </div>
                <div className="nav-sidebar-body">
                    <SidebarContent nuqs={nuqs} />
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
    );
}