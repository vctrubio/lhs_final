import Link from "next/link";
import Image from "next/image";
import { Property } from "#/backend/types";

export default function CardProperty({ propiedad }: { propiedad: Property }) {
    return (
        <Link href={`/propiedades/${propiedad.url}`} className="card-property">
            <Image src={propiedad.cover_url[0]}
                title={propiedad.title}
                alt={propiedad.title}
                width={65}
                height={65}
                quality={100}
                style={{ objectFit: 'cover' }}
            />
            <h1>{propiedad.title}</h1>
        </Link>
    )
}