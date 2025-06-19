"use client";

import useLogin from "../Login/useLogin";

const ProfileDropDown: React.FC = () => {
  const { clear } = useLogin();

  return (
    <ul className="absolute z-10 left-[-5.5rem] mt-[0.25rem] rounded-[1rem] border border-gray-300 bg-white overflow-hidden text-[1rem] text-center">
      <a href="/profile">
        <li className="px-[1rem] py-[0.625rem] hover:bg-light-purple">
          <span className="block w-full px-[0.75rem] py-[0.5rem] rounded-[0.625rem]">
            마이페이지
          </span>
        </li>
      </a>
      <li
        className="cursor-pointer px-[1rem] py-[0.625rem] hover:bg-light-purple"
        onClick={() => clear()}
      >
        <span className="block w-full px-[0.75rem] py-[0.5rem] rounded-[0.625rem]">로그아웃</span>
      </li>
    </ul>
  );
};

export default ProfileDropDown;
