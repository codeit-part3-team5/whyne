"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import dropdownicon from "@/assets/dropdown-icon.png";

type SelectInputProps = {
  className?: string;
};

// 드롭다운에서 와인 타입을 고르는 배열입니다. OPTIONS 배열을 만들어서 map 을 돌리는 방식입니다.
const OPTIONS = ["Red", "White", "Sparkling"];

export default function SelectInput({ className = "" }: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열려 있는지 여부
  const [selected, setSelected] = useState("Red"); // 선택된 와인 타입
  const containerRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지를 위한 ref

  // 외부 클릭 시 드롭다운을 닫기 위한 로직입니다.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 입력한 텍스트가 소문자여도 일치하는 옵션이 있다면 그것을 찾아주는 기능입니다
  const lowerCaseSelected =
    OPTIONS.find((opt) => opt.toLowerCase() === selected.toLowerCase()) || selected;

  // 포커스가 빠질 때 소문자로 입력해도 정확한 옵션으로 대소문자 맞춤
  const handleBlur = () => {
    const upperCase = OPTIONS.find((opt) => opt.toLowerCase() === selected.toLowerCase());
    if (upperCase) {
      setSelected(upperCase);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-[25.75rem] ${className}`}>
      {/* 드롭다운 입력창입니다 */}
      <input
        className="w-full h-[3rem] sm:h-[3rem] rounded-[1rem] border border-gray-300 pr-[3rem] pl-[1rem] text-gray-500 focus:border-dark-purple focus:outline-none sm:pt-[0.875rem] sm:pb-[0.875rem] sm:pr-[1.25rem] sm:pl-[1.25rem]"
        value={selected}
        onBlur={handleBlur}
        onChange={(e) => setSelected(e.target.value)}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {/* 입력창 오른쪽 아이콘입니다 */}
      <Image
        alt="드롭다운 아이콘"
        className="absolute right-[1rem] top-1/2 -translate-y-1/2 cursor-pointer"
        height={20}
        src={dropdownicon}
        width={20}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {/* 드롭다운 목록입니다 */}
      {isOpen && (
        <ul className="absolute z-10 mt-[0.25rem] w-full rounded-[1rem] border border-gray-300 bg-white overflow-hidden text-[1rem]">
          {OPTIONS.map((option) => (
            <li
              key={option}
              className="px-[0.5rem] py-[0.5rem] cursor-pointer"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {/* 선택된 항목은 강조되어 표시됩니다 */}
              {lowerCaseSelected === option ? (
                <span className="block w-full bg-light-purple text-purple font-[500] rounded-[0.625rem] px-[0.75rem] py-[0.5rem]">
                  {option}
                </span>
              ) : (
                <span className="block w-full px-[0.75rem] py-[0.5rem] text-black hover:bg-light-purple rounded-[0.625rem]">
                  {option}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
