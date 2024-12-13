import { unstable_cache } from "next/cache";
import { fetchEntriesContentful } from "./apisConnections";

// Cache the fetchEntriesContentful function
const getCachedProperties = unstable_cache(
    async () => {
        const { properties } = await fetchEntriesContentful();
        return properties;
    },
    ['properties-cache'], // cache key
    {
        revalidate: 3600, // revalidate every hour
        tags: ['properties']
    }
);

//   const PropertyProviderWrapper = () => (
//     <div>
//       <PropertyProvider>
//         <TakeOne />
//       </PropertyProvider>
//     </div>
//   );
