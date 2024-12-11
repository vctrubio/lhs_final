'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";
import { Slider } from "@mui/material"
import { PropertyParams } from "#/backend/parsing";
import { INuqs } from "#/backend/nuqsv2";
import { IconPrice, IconBed, IconBath, IconSearch, IconPlano, IconLocation, IconRulerMeters, IconRepeatClassic } from '@/utils/svgs'; // Example icons

function SidebarContent({ nuqs }: { nuqs: any }) {
    return (
        <div className="border">
            {Object.keys(nuqs.sliders).map((key, index) => (
                <div className="flex flex-col gap-2" key={index}>
                    <div className="flex justify-between">
                        <h2>{nuqs.sliders[key].params.title}</h2>
                        {nuqs.sliders[key].params.icon}
                    </div>
                    <Slider
                        value={nuqs.sliders[key].values}
                        onChange={(_, newValue) => nuqs.sliders[key].valueSet(newValue)}
                        min={nuqs.sliders[key].params.min}
                        max={nuqs.sliders[key].params.max}
                        marks={[{ value: nuqs.sliders[key].params.min, label: nuqs.sliders[key].params.min }, { value: nuqs.sliders[key].params.max, label: nuqs.sliders[key].params.max }]}
                        disableSwap
                        step={nuqs.sliders[key].params.title === 'Precio' ? 0.1 : 1}
                    />
                </div>
            ))}
        </div>
    );
}

export default function SideBar({ propertyParams }: { propertyParams: PropertyParams }) {
    const [isOpen, setIsOpen] = useState(false);

    const nuqs = INuqs(propertyParams);

    const handleReset = () => {
        nuqs.handleReset();
    }

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