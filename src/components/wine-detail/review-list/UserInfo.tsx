import { User } from "@/types/User";

interface UserInfoProps {
  user: User;
  date: string;
}

export default function UserInfo({ user, date }: UserInfoProps) {
  return (
    <div className="h-full whitespace-nowrap justify-between flex items-start flex-col gap-1 leading-6.5 max-mb:gap-0">
      <span className="w-full h-full text-gray800 text-lg max-mb:text-base font-semibold max-mb:w-full max-mb:h-full">
        {user.nickname}
      </span>
      <span className="w-full h-full text-gray500 text-base max-mb:text-sm max-mb:font-normal max-mb:leading-6  max-mb:w-full max-mb:h-full">
        {date}
      </span>
    </div>
  );
}
