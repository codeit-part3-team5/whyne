"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import dropdownicon from "@/assets/dropdown-icon.png";

//  드롭다운에서 와인 타입을 고르는 배열입니다. OPTIONS 배열을 만들어서 map 을 돌리는 방식입니다.
const OPTIONS = ["Red", "White", "Sparkling"];

export default function SelectInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Red");
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫히게 되는 로직입니다
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 소문자로 입력해도 드롭다운에서 일치하는 와인타입에 맞춰서 골라주는 기능입니다
  const lowerCaseSelected =
    OPTIONS.find((opt) => opt.toLowerCase() === selected.toLowerCase()) || selected;

  // 소문자로 인풋에 입력해도 대문자로 바꿔주는 기능입니다
  const handleBlur = () => {
    const upperCase = OPTIONS.find((opt) => opt.toLowerCase() === selected.toLowerCase());
    if (upperCase) {
      setSelected(upperCase);
    }
  };

  return (
    <div ref={containerRef} className="relative w-[25.75rem]">
      <input
        className="w-full h-[3rem] rounded-[1rem] border border-gray-300 pr-[3rem] pl-[1rem] text-gray-500 focus:border-dark-purple focus:outline-none"
        value={selected}
        onBlur={handleBlur}
        onChange={(e) => setSelected(e.target.value)}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {/* 드롭다운 토글아이콘에 관한 로직입니다  */}
      <Image
        alt="드롭다운 아이콘"
        className="absolute right-[1rem] top-1/2 -translate-y-1/2 cursor-pointer"
        height={20}
        src={dropdownicon}
        width={20}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {/* 드롭다운에 관한 로직입니다 */}
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
              {/* 소문자로 인풋에 입력해도 드롭다운에서 찾아서 표시되게 하는 로직 */}
              {lowerCaseSelected === option ? (
                <span className="block w-full bg-light-purple text-purple font-[500] rounded-[0.625rem] px-[0.75rem] py-[0.5rem]">
                  {option}
                </span>
              ) : (
                /* hover 했을 때 배경색 지정 */
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
