import { User } from "@/types/User";

interface UserInfoProps {
  user: User;
  date: string;
}

export default function UserInfo({ user, date }: UserInfoProps) {
  return (
    <div className="h-full text-nowrap justify-between flex items-start flex-col gap-1 leading-6.5 max-mb:gap-0">
      <span className="w-full h-full text-gray800 size-4.5 max-mb:size-4 font-semibold max-mb:w-full max-mb:h-full">
        {user.nickname}
      </span>
      <span className="w-full h-full text-gray500 size-4 max-mb:size-3.5 max-mb:font-normal max-mb:leading-6  max-mb:w-full max-mb:h-full">
        {date}
      </span>
    </div>
  );
}
