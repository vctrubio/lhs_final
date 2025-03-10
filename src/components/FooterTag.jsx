"use client";
import React, { useState } from "react";
import { Mail, Send, Download } from "lucide-react";
import { IconWhatsapp } from "@/utils/svgs";
import { contactData } from "@/utils/contactData";
import ShareModal from "./ShareModal";

const ButtonIcon = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center bg-backgroundBeigh rounded-full m-2 p-5 overflow-hidden hover:bg-gray-200 transition-colors duration-300"
      style={{ width: "60px", height: "60px" }}
    >
      <div className={label !== "Whatsapp" ? "transform scale-105" : ""}>
        <Icon />
      </div>
    </button>
  );
};

export function FooterTagShare({ property }) {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  
  const toggleShareModal = () => {
    setShareModalOpen(prevState => !prevState);
  };
  
  const buttons = [
    {
      icon: IconWhatsapp,
      label: "Whatsapp",
      variant: "whatsapp",
      onClick: () =>
        window.open(
          `${contactData.whatsappUrl}?text=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`,
        ),
    },
    {
      icon: Mail,
      label: "Contactar",
      variant: "mail",
      onClick: () =>
        window.open(
          `mailto:${contactData.email}?subject=Interesado%20en%20${property.title}&body=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`,
        ),
    },
    {
      icon: Download,
      label: "Ficha",
      variant: "download",
      onClick: () => window.open(`/ventas/${property.url}/pdf`),
    },
    {
      icon: Send,
      label: "Enviar",
      variant: "send",
      onClick: toggleShareModal,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", gap: "0.25rem", paddingTop: "0.5rem" }}>
        {buttons.map(({ icon, label, onClick, variant }) => (
          <ButtonIcon
            key={label}
            icon={icon}
            label={label}
            onClick={onClick}
          />
        ))}
      </div>
      
      {isShareModalOpen && (
        <ShareModal 
          isOpen={isShareModalOpen} 
          onClose={toggleShareModal}
          property={property}
          url={typeof window !== 'undefined' ? window.location.href : ''}
        />
      )}
    </div>
  );
}
