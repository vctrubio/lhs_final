import { fetchEntriesContentful } from './backend/apisConnections.ts';

export const getProperties = async () => {
    const { properties } = await fetchEntriesContentful();
    return properties;
}

const properties = await getProperties();
console.log(properties);



