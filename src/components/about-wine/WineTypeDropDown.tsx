"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import dropdownicon from "@/assets/dropdown-icon.png";

type WineType = "Red" | "White" | "Sparkling";

interface WineTypeDropDownProps {
  selected: WineType;
  onChange: (value: WineType) => void;
}

const OPTIONS = ["Red", "White", "Sparkling"] as const;

export default function WineTypeDropDown({ selected, onChange }: WineTypeDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: WineType) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} aria-expanded={isOpen} className="relative w-full max-w-[25.75rem]">
      {/* 입력창 */}
      <input
        readOnly
        className="w-full h-[3rem] rounded-[1rem] border border-gray-300 pr-[3rem] pl-[1rem] text-gray-500 focus:border-dark-purple focus:outline-none cursor-pointer"
        value={selected}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* 드롭다운 아이콘 */}
      <Image
        alt="드롭다운 아이콘"
        className="absolute right-[1rem] top-1/2 -translate-y-1/2 cursor-pointer"
        height={20}
        src={dropdownicon}
        width={20}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* 옵션 목록 */}
      {isOpen && (
        <ul className="absolute z-10 mt-[0.25rem] w-full rounded-[1rem] border border-gray-300 bg-white overflow-hidden text-[1rem]">
          {OPTIONS.map((option) => (
            <li key={option} className="cursor-pointer" onClick={() => handleSelect(option)}>
              <span
                className={`block w-full px-[0.75rem] py-[0.5rem] rounded-[0.625rem] ${
                  selected.toLowerCase() === option.toLowerCase()
                    ? "bg-light-purple text-purple font-[500]"
                    : "hover:bg-light-purple text-black"
                }`}
              >
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
