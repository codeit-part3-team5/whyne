import { User } from "@/types/User";

interface UserInfoProps {
  user: User;
  date: string;
}

export default function UserInfo({ user, date }: UserInfoProps) {
  return (
    <div className="h-full text-nowrap justify-between flex items-start flex-col gap-1 leading-6.5">
      <span className="w-full h-full text-gray800 size-4.5 font-semibold">{user.nickname}</span>
      <span className="w-full h-full text-gray500 size-4">{date}</span>
    </div>
  );
}
