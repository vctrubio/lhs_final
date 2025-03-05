"use client";
import React from "react";

const ButtonIcon = ({ icon: Icon, label, onClick, variant = "default" }) => {
  return (
    <button
      className={`button-icon ${variant}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="button-icon-inner">
        <Icon className="button-icon-svg" />
      </span>
    </button>
  );
};

export default ButtonIcon;
