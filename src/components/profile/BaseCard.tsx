import { ReactNode } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import { useDropdown } from "@/hooks/useDropdown";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import ReviewDropDown from "../dropdown/ReviewDropDown";
import WineDropDown from "../dropdown/WineDropDown";

interface BaseCardProps<T> {
  items: T[];
  renderContent: (item: T) => ReactNode;
  getId: (item: T) => number;
  getUserId: (item: T) => number;
  dropdownOptions?: {
    type: "review" | "wine";
  };
  refresh?: () => void;
}

export function BaseCard<T>({
  items,
  renderContent,
  getId,
  getUserId,
  refresh,
  dropdownOptions,
}: BaseCardProps<T>) {
  const { openDropdownId, dropdownRefs, handleDropdownToggle } = useDropdown(items, getId);
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const ellipseSize = isMobile ? 24 : 26;

  return (
    <section className="flex flex-col gap-4">
      {items.map((item) => {
        const itemId = getId(item);
        const userId = getUserId(item);
        const dropdownComponents = {
          review: (
            <ReviewDropDown
              authorId={userId}
              refresh={refresh}
              reviewId={itemId}
              size={isMobile ? "small" : "default"}
            />
          ),
          wine: (
            <WineDropDown refresh={refresh} size={isMobile ? "small" : "default"} wineId={itemId} />
          ),
        };
        return (
          <div
            key={itemId}
            className="bg-white py-6 px-10 max-mb:py-4 max-mb:px-5 rounded-2xl shadow-sm border border-gray-300"
          >
            <div className="flex gap-6 relative items-center max-md:gap-5">
              {/* 메인 콘텐츠 - flex-1로 남은 공간 모두 차지 */}
              <div className="flex-1">{renderContent(item)}</div>

              {/* 드롭다운 버튼 - 우측 고정 */}
              {dropdownOptions && (
                <div
                  ref={(el) => {
                    dropdownRefs.current[itemId] = el;
                  }}
                  className="flex-shrink-0 self-start"
                >
                  <button
                    aria-expanded={openDropdownId === itemId}
                    aria-haspopup="menu"
                    aria-label="옵션 메뉴"
                    onClick={() => handleDropdownToggle(itemId)}
                  >
                    <Ellipse height={ellipseSize} width={ellipseSize} />
                  </button>
                  {openDropdownId === itemId && (
                    <div className="absolute right-0 top-8 z-10">
                      {dropdownComponents[dropdownOptions.type]}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
