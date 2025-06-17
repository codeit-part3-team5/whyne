import { useCallback, useEffect, useRef, useState } from "react";

export function useDropdown<T>(items: T[], getId: (item: T) => number) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleDropdownToggle = useCallback((id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (openDropdownId !== null) {
        const currentDropdown = dropdownRefs.current[openDropdownId];
        if (currentDropdown && !currentDropdown.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openDropdownId]);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [openDropdownId]);

  // 메모리 누수 방지 - 제네릭으로 처리
  useEffect(() => {
    const currentIds = items.map(getId);
    Object.keys(dropdownRefs.current).forEach((id) => {
      if (!currentIds.includes(Number(id))) {
        delete dropdownRefs.current[Number(id)];
      }
    });
  }, [items, getId]);
  return {
    openDropdownId,
    dropdownRefs,
    handleDropdownToggle,
    setOpenDropdownId,
  };
}
