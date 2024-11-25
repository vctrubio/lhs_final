import { TakeOne } from './playground';
import { fetchEntriesContentful } from "../../backend/apisConnections";
export default async function Home() {
  const { properties } = await fetchEntriesContentful();

  return (
    <TakeOne properties={properties} />
  );
}
