import React from "react";

export const PropertyDescription = ({ property }) => {
    return (
        <div className="text-gray-600 max-w-lg mx-auto">
            <div className="text-lg sm:text-2xl leading-relaxed p-2 sm:p-4 text-center ">
                {property.description}
            </div>
        </div>
    );
};
