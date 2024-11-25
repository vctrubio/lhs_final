import { fetchEntriesContentful } from "../../backend/apisConnections";
import { Property } from "../../backend/types";

export const TakeOne = ({ properties, setProperties }: { properties: Property[], setProperties: (properties: Property[]) => void }) => (
    <div className="p-8 bg-gray-100 min-h-screen">
        <div className="border m-8 p-8 bg-white shadow-lg rounded-lg">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={async () => {
                const { properties } = await fetchEntriesContentful();
                setProperties(properties);
                console.log('Data loaded');
            }}>
                click here to load data
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
                <div key={index} className="property-row bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                    <p className="text-gray-700 mb-4">{property.description}</p>
                    <p className="text-gray-900 font-semibold">Price: ${property.precio}</p>
                    <p className="text-gray-600">Barrio: {property.barrioRef.name}</p>
                    <p className="text-gray-600">Characteristics: {property.charRef.tipoDePropiedad}, {property.charRef.dormitorios} bedrooms</p>
                </div>
            ))}
        </div>
    </div>
)
