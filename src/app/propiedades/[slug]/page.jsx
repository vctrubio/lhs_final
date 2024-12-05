import PropertyPage from "@/components/PropertyPage";
import { fetchPropertyByID } from "#/backend/apisConnections";

export default async function Page({ params }) {
    const resolvedParams = await params;
    const property = await fetchPropertyByID(resolvedParams.slug);

    if (!property) {
        return <div>Property not found</div>
    }

    return <PropertyPage property={property} />
}