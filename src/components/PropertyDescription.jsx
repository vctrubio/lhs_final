import React from 'react';

export const PropertyDescription = ({ property }) => {
    return (
        <div className="text-gray-600 text-xl leading-relaxed p-4 my-auto text-center">
            {property.description}
        </div>
    );
};
