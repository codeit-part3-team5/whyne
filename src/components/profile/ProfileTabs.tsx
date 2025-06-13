"use client";

interface ProfileTabsProps {
  activeTab: number;
  handleTabClick: (tabIndex: number) => void;
  reviewCount: number;
  wineCount: number;
}

const TABS = [
  { id: 1, label: "내가 쓴 후기" },
  { id: 2, label: "내가 등록한 와인" },
] as const;

export default function ProfileTabs({
  activeTab,
  handleTabClick,
  reviewCount = 0,
  wineCount = 0,
}: ProfileTabsProps) {
  const getTabButtonClass = (tabId: number) => {
    const baseClass = "hover:text-[var(--color-purple)] transition-colors";
    const activClass = activeTab === tabId ? "text-gray-800" : "text-gray-400";
    return `${baseClass} ${activClass}`;
  };

  const getCount = (tabId: number) => {
    return tabId === 1 ? reviewCount : wineCount;
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
      <div>
        <span className="text-[var(--color-purple)]">총 {getCount(activeTab)}개</span>
      </div>
    </div>
  );
}
