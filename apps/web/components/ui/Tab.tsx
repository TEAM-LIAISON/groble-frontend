'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function Tab({ items, activeTab, onTabChange, className = '' }: TabProps) {
  return (
    <div className={`flex w-full ${className}`}>
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex-1 flex flex-col items-center py-2 cursor-pointer transition-colors ${activeTab === item.id
            ? 'text-label-normal'
            : 'text-label-alternative'
            }`}
        >
          <span className="text-body-1-normal font-semibold mb-2">
            {item.label}
          </span>
          <div
            className={`w-full h-[1.5px] transition-colors ${activeTab === item.id
              ? 'bg-label-normal'
              : 'bg-line-normal'
              }`}
          />
        </button>
      ))}
    </div>
  );
}
