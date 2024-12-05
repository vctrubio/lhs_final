import Link from "next/link";
export function Logo() {
    return (
        <div className="lhs-logo">
            <Link href="/" title="LHS Concept" className="border">
                LHS
            </Link>
            <input type="text" placeholder="Buscar" />
        </div>
    )
}

export default function NavBar() {
    return (
        <Logo />
    )
}

