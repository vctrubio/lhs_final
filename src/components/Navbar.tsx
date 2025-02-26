import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex w-full justify-between p-4 bg-primary">
        <div>LHS Concept</div>
        <div className="flex space-x-4">
            <div>
                Ventas
            </div>
            <div>
                Alquiler
            </div>
            <div>
                Contacto
            </div>
        </div>
    </div>  
  );
};

export default Navbar;
