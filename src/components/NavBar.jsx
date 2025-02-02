'use client'
import { Menu } from 'lucide-react'

import { LHSBond } from "./lhsbond"

export default function NavBar() {
    return (
        <>
            <div className="flex justify-center items-center gap-4 bg-backgroundDark">
                <button
                    className="burger-button"
                    aria-label="Toggle navigation"
                >
                    <Menu size={44} />
                </button>

                <LHSBond />
            </div>
        </>
    )
}


