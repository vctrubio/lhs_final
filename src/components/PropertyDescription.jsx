import React from "react";

export const gropertyDescription = ({ property }) => {
    return (
        <div className="text-gray-600 text-2xl my-auto leading-relaxed p-4 text-center max-w-lg mx-auto">
            {property.description}
        </div>
    );
};
