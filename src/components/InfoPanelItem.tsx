import React from 'react';

export interface InfoPanelItemProps {
  name: string;
  action: () => void;
}

export default function InfoPanelItem({ name, action }: InfoPanelItemProps) {
  return (
    <div
      onClick={action}
      className="cursor-pointer border-2 border-black rounded-lg p-2 hover:bg-gray-200 flex justify-between items-center"
    >
      <span>{name}</span>
      <span>{'>'}</span>
    </div>
  );
}
