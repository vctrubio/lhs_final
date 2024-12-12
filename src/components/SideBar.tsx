'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";
import { Slider } from "@mui/material"
import { PropertyParams } from "#/backend/parsing";
import { INuqs } from "#/backend/nuqsv2";


const SearchInput = () => {
    return (
        <div>
            <input type="text" placeholder="Buscar" />
        </div>
    )
}

const Barrios = () => {
    return (
        <ul>
            <li>Barrio 1</li>
            <li>Barrio 2</li>
            <li>Barrio 3</li>
        </ul>
    )
}

function SidebarContent({ nuqs }: { nuqs: any }) {


    return (
        <div className="sidebar-content">
            {Object.keys(nuqs.sliders).map((key, index) => (
                <div key={index}>
                    <div className="sidebar-content-header">
                        <h2>{nuqs.sliders[key].params.title}</h2>
                        <div className="sidebar-content-icon">{nuqs.sliders[key].params.icon}</div>
                    </div>
                    <Slider
                        className="sidebar-content-slider"
                        value={nuqs.sliders[key].values}
                        onChange={(_, newValue) => nuqs.sliders[key].valueSet(newValue)}
                        min={nuqs.sliders[key].params.min}
                        max={nuqs.sliders[key].params.max}
                        marks={[{ value: nuqs.sliders[key].params.min, label: nuqs.sliders[key].params.min }, { value: nuqs.sliders[key].params.max, label: nuqs.sliders[key].params.max }]}
                        step={nuqs.sliders[key].params.title === 'Precio' ? 0.1 : 1}
                        disableSwap
                        valueLabelDisplay='auto'
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
                <div className="nav-sidebar-head border">
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