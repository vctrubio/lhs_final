'use client'
import React from "react";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Slider } from "@mui/material"
import { PropertyParams } from "#/backend/parsing";
import { INuqs } from "#/backend/nuqsv2";
import { IconRepeatClassic, IconSearch } from "@/utils/svgs"
import { Barrio } from "#/backend/types";

function SearchInput({ reset, queryParams, queryTitle, setQueryTitle }: { reset: () => void, queryParams: boolean, queryTitle: string, setQueryTitle: (value: string) => void }) {
    const Icon = queryParams ? <IconRepeatClassic /> : <IconSearch />;

    return (
        <div className='sidebar-search'>
            <input type="text" placeholder="Buscador" value={queryTitle} onChange={(e) => setQueryTitle(e.target.value)} />
            <div className="cursor-pointer w-12 h-12 flex items-center justify-center" onClick={reset}>{Icon}</div>
        </div>
    )
}

function BarriosChecklist({ barrios, selectedBarrios, onChange }: {
    barrios: Barrio[],
    selectedBarrios: string | null,
    onChange: (value: string | null) => void
}) {
    const [selected, setSelected] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (selectedBarrios) {
            setSelected(new Set(selectedBarrios.split(',')))
        } else {
            setSelected(new Set())
        }
    }, [selectedBarrios])

    const handleToggle = (barrioName: string) => {
        const newSelected = new Set(selected)
        if (newSelected.has(barrioName)) {
            newSelected.delete(barrioName)
        } else {
            newSelected.add(barrioName)
        }
        setSelected(newSelected)

        if (newSelected.size === 0) {
            onChange(null)
        } else {
            onChange(Array.from(newSelected).join(','))
        }
    }

    return (
        <div className="barrios-checklist">
            <h2>Barrios</h2>
            <div className="barrios-list">
                {barrios.map((barrio) => (
                    <label key={barrio.name} className="barrio-checkbox">
                        <input
                            type="checkbox"
                            checked={selected.has(barrio.name)}
                            onChange={() => handleToggle(barrio.name)}
                        />
                        {barrio.name}
                    </label>
                ))}
            </div>
        </div>
    )
}

function SidebarContentProperties({ nuqs, barrios }: { nuqs: any, barrios: Barrio[] }) {

    return (
        <div className="sidebar-content">
            {Object.keys(nuqs.sliders).map((key, index) => (
                <div key={index}>

                    <div className="sidebar-content-header">
                        <div>{nuqs.sliders[key].params.title}</div>
                        <div className="sidebar-content-icon">{nuqs.sliders[key].params.icon}</div>
                    </div>

                    <Slider
                        value={nuqs.sliders[key].values}
                        onChange={(_, newValue) => nuqs.sliders[key].valueSet(newValue)}
                        min={nuqs.sliders[key].params.min}
                        max={nuqs.sliders[key].params.max}
                        marks={[
                            { value: nuqs.sliders[key].params.min, label: nuqs.sliders[key].params.title === 'Precio' ? `${nuqs.sliders[key].params.min}M` : nuqs.sliders[key].params.min },
                            { value: nuqs.sliders[key].params.max, label: nuqs.sliders[key].params.title === 'Precio' ? `${nuqs.sliders[key].params.max}M` : nuqs.sliders[key].params.max }
                        ]}
                        step={nuqs.sliders[key].params.title === 'Precio' ? 0.1 : 1}
                        disableSwap
                        valueLabelDisplay='auto'
                        style={{
                            color: 'var(--color-green-dark)',
                            padding: 'inherit',
                            width: '82%',
                            margin: '0 auto',
                        }}
                    />

                </div>
            ))}
            <div className="sidebar-content-barrios">
                <BarriosChecklist
                    barrios={barrios}
                    selectedBarrios={nuqs.barrios.value}
                    onChange={nuqs.barrios.setValue}
                />
            </div>
        </div>
    );
}

const SidebarContentRootPage = ({ nuqs, barrios }: { nuqs: any, barrios: Barrio[] }) => {
    return (
        <>
            <SearchInput reset={nuqs.handleReset} queryParams={nuqs.hasQueryParams} queryTitle={nuqs.query.value} setQueryTitle={nuqs.query.setValue} />
            <SidebarContentProperties nuqs={nuqs} barrios={barrios} />
        </>
    )
}

export default function SideBar({ propertyParams, barrios }: { propertyParams: PropertyParams, barrios: Barrio[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const nuqs = INuqs(propertyParams);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (window.innerWidth >= 768) {
            document.body.classList.toggle('sidebar-open', isOpen);
        }
        return () => {
            document.body.classList.remove('sidebar-open');
        };
    }, [isOpen]);

    return (
        <>
            <button
                className="burger-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                <Menu size={44} />
            </button>

            <div className={`nav-sidebar ${isOpen ? 'open' : ''}`}>
                <div className='nav-sidebar-menu'>
                    <div className="nav-sidebar-head">
                        Propiedades
                    </div>
                    <div className="nav-sidebar-body">
                        <SidebarContentRootPage nuqs={nuqs} barrios={barrios} />
                    </div>
                </div>
            </div>
        </>
    );
}
