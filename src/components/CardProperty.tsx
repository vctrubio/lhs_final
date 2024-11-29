import Link from "next/link";
import Image from "next/image";
import { Property } from "#/backend/types";
import { formatCurrency } from "@/utils/utils";
import { getBathrooms } from "@/utils/utils";

import {
    IconRulerMeters,
    IconBed,
    IconBathTop,
    IconLocation
} from '@/utils/svgs'

interface DescBoxProps {
    text: string | number;
    icon: React.ComponentType;
    fillWhite?: boolean;
}

const DescBox: React.FC<DescBoxProps> = ({ text, icon: Icon, fillWhite = true }) => {
    return (
        <div className="property-desc-box">
            <span className={fillWhite ? 'icon-white' : ''}><Icon /></span>
            <span>{text}</span>
        </div>
    );
};


export const CardProperty = ({ property, cssStateHover }: { property: Property, cssStateHover: boolean }) => {
    // const coverPhoto = property ? property.cover_url[0] : '/images/placeholder.jpg';
    const coverPhoto = property.cover_url[0]
    const area = property.charRef.metrosCuadradros || 'N/A';
    const bedrooms = property.charRef.dormitorios || 'N/A';
    const bathrooms = getBathrooms(property) || 'N/A';

    console.log('checking property', property.charRef)
    return (
        <div className="property" css-state={cssStateHover ? 'on' : ''}>
            <Link href={`/propiedades/${property.url}`} title={property.title}>
                <div className="property-title">
                    <h1>{property.title}</h1>
                    <h2>{formatCurrency(property.precio, property.buyOrRent)}</h2>
                </div>
                <div className="property-banner">
                    <Image
                        src={coverPhoto}
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        quality={100}
                        priority
                        title={property.title}
                    />
                    <div className="property-desc">
                        <DescBox text={area} icon={IconRulerMeters} />
                        <DescBox text={String(bathrooms)} icon={IconBathTop} />
                        <DescBox text={String(bedrooms)} icon={IconBed} />
                        <DescBox text={String(bedrooms)} icon={IconBed} /> 
                        <DescBox text={String(property.barrioRef?.name)} icon={IconLocation} fillWhite={false} />
                    </div>
                </div>
            </Link>
        </div >
    );
};