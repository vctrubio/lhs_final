"use client";
import React, { useState } from "react";
import { Mail, Send, Download } from "lucide-react";
import { IconWhatsapp } from "@/utils/svgs";
import ButtonIcon from "./ButtonIcon";

export function FooterTagShare({ property }) {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  
  const buttons = [
    {
      icon: IconWhatsapp,
      label: "Whatsapp",
      variant: "whatsapp",
      onClick: () =>
        window.open(
          `https://wa.me/+34616746971?text=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`,
        ),
    },
    {
      icon: Mail,
      label: "Contactar",
      variant: "mail",
      onClick: () =>
        window.open(
          `mailto:lourdes.hernansanz@lhsconcept.com?subject=Interesado%20en%20${property.title}&body=Hola, he visto: ${property.title} -- ${metadata.openGraph.url}`,
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
      onClick: () => setShareModalOpen(true),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around", gap: "0.25rem", paddingTop: "0.5rem" }}>
        {buttons.map(({ icon, label, onClick, variant }) => (
          <ButtonIcon
            key={label}
            icon={icon}
            label={label}
            onClick={onClick}
            variant={variant}
          />
        ))}
      </div>
    </>
  );
}
