import { ReactNode } from "react";

import Ellipse from "@/assets/ellipse-icon.svg";
import { useDropdown } from "@/hooks/useDropdown";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import DropDown from "../DropDown";

interface BaseCardProps<T> {
  items: T[];
  renderContent: (item: T) => ReactNode;
  getId: (item: T) => number;
  dropdownOptions?: {
    firstText: string;
    secondText: string;
  };
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function BaseCard<T>({
  items,
  renderContent,
  getId,
  dropdownOptions,
  onEdit: _onEdit,
  onDelete: _onDelete,
}: BaseCardProps<T>) {
  const { openDropdownId, dropdownRefs, handleDropdownToggle } = useDropdown(items, getId);
  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const ellipseSize = isMobile ? 24 : 26;

  return (
    <section className="flex flex-col gap-4">
      {items.map((item) => {
        const itemId = getId(item);
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
                      <DropDown
                        firstText={dropdownOptions.firstText}
                        secondText={dropdownOptions.secondText}
                        size={isMobile ? "small" : "default"}
                        // onFirstClick={() => onEdit?.(item)}
                        // onSecondClick={() => onDelete?.(item)}
                      />
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
