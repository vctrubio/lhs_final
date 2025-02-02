// import { fetchPropertyByID } from '#/backend/apisConnections';
// import { PropertyBroucher } from '@/components/PropertyPageBrochure';
// import { PdfParent, CreatePdf } from '@/components/PdfPageView';

export default function hello() {
    return <div>Hello</div>;
}

// type PageParams = { slug: string }
// export default async function PdfView({ params }: { params: PageParams; }) {
//     const fetchedProperty = await fetchPropertyByID(params.slug);

//     if (!fetchedProperty) {
//         return <div>--page not found exec--</div>;
//     }

//     const pdf = new PdfParent(fetchedProperty);
//     const brochure = <PropertyBroucher property={fetchedProperty} flag={true} />;

//     return (
//         <CreatePdf pdf={pdf} brochure={brochure} />
//     );
// }
