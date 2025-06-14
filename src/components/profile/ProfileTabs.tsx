"use client";

interface ProfileTabsProps {
  activeTab: number;
  handleTabClick: (tabIndex: number) => void;
  reviewCount: number;
  wineCount: number;
}

const TABS = [
  { id: 1, label: "내가 쓴 후기", key: "reviewCount" as const },
  { id: 2, label: "내가 등록한 와인", key: "wineCount" as const },
] as const;

export default function ProfileTabs({
  activeTab,
  handleTabClick,
  reviewCount,
  wineCount,
}: ProfileTabsProps) {
  const counts = { reviewCount, wineCount };

  const getTabButtonClass = (tabId: number) => {
    const baseClass = "hover:text-[var(--color-purple)] transition-colors";
    const activClass = activeTab === tabId ? "text-gray-800" : "text-gray-400";
    return `${baseClass} ${activClass}`;
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-8 text-xl max-mb:gap-4 max-mb:text-lg font-bold">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={getTabButtonClass(tab.id)}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="self-center">
        {TABS.find((tab) => tab.id === activeTab) && (
          <span className="text-[var(--color-purple)]">
            {counts[TABS.find((tab) => tab.id === activeTab)!.key]}개
          </span>
        )}
      </div>
    </div>
  );
}
