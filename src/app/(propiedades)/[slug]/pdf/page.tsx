import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { PdfParent, CreatePdf } from '@/components/PdfPageView';
import { getPropertyData, generatePropertyMetadata, Props, PageParams } from '@/utils/metadata';
import { Metadata } from 'next';
import NotFound from '@/app/not-found';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);
    return generatePropertyMetadata(property, resolvedParams.slug, true);
}

export default async function PdfView({ params }: { params: Promise<PageParams>; }) {
    const resolvedParams = await params;
    const property = await getPropertyData(resolvedParams);

    if (!property) {
        return <NotFound />;
    }

    const pdf = new PdfParent(property);
    const brochure = <PropertyBroucher property={property} flag={true} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
}
