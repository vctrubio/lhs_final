import React from 'react';

export const PropertyDescription = ({ property }) => {
    return (
        <div className="text-gray-600 text-xl leading-relaxed p-4 my-auto text-center max-w-lg mx-auto">
            {property.description}
        </div>
    );
};
