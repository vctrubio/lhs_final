import { fetchPropertyByID } from '#/backend/apisConnections';
import { PropertyBroucher } from '@/components/PropertyPageBrochure';
import { PdfParent, CreatePdf } from '@/components/PdfPageView';

type PageParams = { slug: string }
export default async function PdfView({ params }: { params: Promise<PageParams>; }) {
    const resolvedParams = await params; 
    const fetchedProperty = await fetchPropertyByID(resolvedParams.slug);

    if (!fetchedProperty) {
        return <div>--page not found exec--</div>;
    }

    const pdf = new PdfParent(fetchedProperty);
    const brochure = <PropertyBroucher property={fetchedProperty} flag={true} />;

    return (
        <CreatePdf pdf={pdf} brochure={brochure} />
    );
}
