import { useState } from "react";
import type React from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap justify-center gap-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 font-medium text-sm rounded-t-xl transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg -mb-px"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="animate-fade-in">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
