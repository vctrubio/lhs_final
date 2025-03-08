"use client";
import React from "react";

const ButtonIcon = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="bg-backgroundBeigh w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
    >
        <Icon />
    </button>
  );
};

export default ButtonIcon;
