import { Property } from "#/backend/types";

export default function PropertyPage({property}: {property: Property}) {
    return (
        <>
         {property.title}
        </>
    )
}