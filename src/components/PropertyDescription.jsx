import React from "react";

export const PropertyDescription = ({ property }) => {
    return (
        <div className="text-gray-600 max-w-lg mx-auto">
            <div className="text-2xl leading-relaxed p-4 text-center">
                {property.description}
            </div>
        </div>
    );
};

// <div>
// <h2>Barrio</h2>
// <div className="text-xl text-gray-600">
//     {property.barrioRef.description}
//     {/* change to barrioRef.comment */}
// </div>
// </div>