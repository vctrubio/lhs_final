'use client'
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/NavBar";
import { Slider } from "@mui/material"
import { PropertyParams } from "#/backend/parsing";
import { INuqs } from "#/backend/nuqsv2";
import { IconRepeatClassic, IconSearch } from "@/utils/svgs"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation";

function SearchInput({ reset, queryParams, queryTitle, setQueryTitle }: { reset: () => void, queryParams: boolean, queryTitle: string, setQueryTitle: (value: string) => void }) {

    const Icon = queryParams ? <IconRepeatClassic /> : <IconSearch />;

    return (
        <div className='sidebar-search'>
            <input type="text" placeholder="Buscador" value={queryTitle} onChange={(e) => setQueryTitle(e.target.value)} />
            <div className="cursor-pointer w-12 h-12 flex items-center justify-center" onClick={reset}>{Icon}</div>
        </div>
    )
}

function SidebarContentProperties({ nuqs }: { nuqs: any }) {

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
                        marks={[
                            { value: nuqs.sliders[key].params.min, label: nuqs.sliders[key].params.title === 'Precio' ? `${nuqs.sliders[key].params.min}M` : nuqs.sliders[key].params.min },
                            { value: nuqs.sliders[key].params.max, label: nuqs.sliders[key].params.title === 'Precio' ? `${nuqs.sliders[key].params.max}M` : nuqs.sliders[key].params.max }
                        ]}
                        step={nuqs.sliders[key].params.title === 'Precio' ? 0.1 : 1}
                        disableSwap
                        valueLabelDisplay='auto'
                        sx={{
                            color: 'var(--color-green-dark)',
                        }}
                    />

                </div>
            ))}
        </div>
    );
}

const SidebarContentRootPage = ({ nuqs }: { nuqs: any }) => {
    return (
        <>
            <SearchInput reset={nuqs.handleReset} queryParams={nuqs.hasQueryParams} queryTitle={nuqs.query.value} setQueryTitle={nuqs.query.setValue} />
            <SidebarContentProperties nuqs={nuqs} />
        </>
    )
}

export default function SideBar({ propertyParams }: { propertyParams: PropertyParams }) {
    const [isOpen, setIsOpen] = useState(false);
    const nuqs = INuqs(propertyParams);
    const url_roots = usePathname()

    return (
        <>
            <div className={`nav-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="nav-sidebar-head">
                    <Logo />
                </div>
                <div className="nav-sidebar-body">
                    {url_roots === '/' && <SidebarContentRootPage nuqs={nuqs} />}
                    {url_roots.startsWith('/propiedades/') && <h1>-{url_roots.split('/')[2]}-</h1>}
                </div>
                <div className="nav-sidebar-footer">
                    <Footer />
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