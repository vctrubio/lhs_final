import Link from "next/link";


export function Logo() {
    return (
        <div className="lhs-logo">
            <Link href="/" title="LHS Concept">
                LHS
            </Link>
            <div className="lhs-nav">
                propiedades
            </div>
        </div>
    )
}

export default function NavBar() {
    return (
        <Logo />
    )
}

