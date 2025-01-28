import Link from "next/link";
import Image from "next/image";
import { Property } from "#/backend/types";
import { formatCurrency } from "@/utils/utils";
import { getBathrooms, getBedrooms } from "@/utils/utils";

import {
    Ruler,
    Bath,
    Bed,
    MapPin
} from "lucide-react";

interface DescBoxProps {
    text: string | number;
    icon: React.ComponentType;
    fillWhite?: boolean;
}

const DescBox: React.FC<DescBoxProps> = ({ text, icon: Icon }) => {
    return (
        <div className="property-desc-box">
            <span className="text-white text-lg"><Icon /></span>
            <span>{text}</span>
        </div>
    );
};

export const CardProperty = ({ property, cssStateHover }: { property: Property, cssStateHover: boolean }) => {
    const coverPhoto = property.cover_url[0]
    const area = property.charRef.metrosCuadradros || 'N/A';
    const bedrooms = getBedrooms(property) || 'N/A';
    const bathrooms = getBathrooms(property) || 'N/A';

    return (
        <div className="property" css-state={cssStateHover ? 'on' : ''}>
            <Link href={`/${property.url}`} title={property.title}>
                <div className="property-title">
                    <h1>{property.title}</h1>
                    <h2>{formatCurrency(property.precio, property.buyOrRent)}</h2>
                </div>
                <div className="property-banner">
                    <Image
                        src={coverPhoto.url}
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        priority
                        title={property.title}
                        placeholder="blur"
                        blurDataURL={coverPhoto.url}
                    />
                    <div className="property-desc">
                        <DescBox text={area} icon={Ruler} />
                        <DescBox text={String(bedrooms)} icon={Bed} />
                        <DescBox text={String(bathrooms)} icon={Bath} />
                        <DescBox text={String(property.barrioRef?.name)} icon={MapPin} />
                    </div>
                </div>
            </Link>
        </div>
    );
};
