'use client'
import React from 'react';

interface InfoPanelItemProps {
  name: string;
  action: () => void;
}

function InfoPanelItem({ name, action }: InfoPanelItemProps) {
  return (
    <div
      onClick={action}
      className="cursor-pointer border-2 border-black rounded-lg p-4 hover:bg-gray-200 flex justify-between items-center "
    >
      <span>{name}</span>
      <span>{'>'}</span>
    </div>
  );
}

const items: InfoPanelItemProps[] = [
  { name: 'Guia de Barrios kive', action: () => alert('Guia de Barrios') },
  { name: 'Servicios', action: () => alert('Servicios') },
  { name: 'Contacta con Nosotros', action: () => alert('Contacta con Nosotros') }
];

export default function InfoPanel() {
  return (
    <>
      {items.map(item => (
        <InfoPanelItem key={item.name} name={item.name} action={item.action} />
      ))}
    </>
  );
}
