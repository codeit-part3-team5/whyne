import { cn } from "@/utils/cn";

interface ProfileCircleProps {
  imageUrl?: string | null;
  size?: "default" | "mobile";
}

export default function ProfileCircle({ imageUrl, size = "default" }: ProfileCircleProps) {
  const sizeClasses =
    size === "mobile"
      ? "w-[2.625rem] h-[2.625rem]"
      : "w-[4rem] h-[4rem] max-mb:w-[2.625rem] max-mb:h-[2.625rem]";

  return (
    <div className={cn("relative", sizeClasses)}>
      {imageUrl ? (
        <img
          alt="사용자 프로필"
          className="w-full h-full rounded-full object-cover border-[1.5px] border-gray-300 select-none pointer-events-none"
          src={imageUrl}
        />
      ) : (
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 66 67"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="33" cy="33.5" fill="#CFDBEA" r="32.5" stroke="#CFDBEA" />
          <path
            d="M33 1.5C15.325 1.5 1 15.825 1 33.5C1 51.175 15.325 65.5 33 65.5C50.675 65.5 65 51.175 65 33.5C65 15.825 50.675 1.5 33 1.5ZM33 17.5C37.9712 17.5 42 21.53 42 26.5C42 31.47 37.975 35.5 33 35.5C28.03 35.5 24 31.47 24 26.5C24 21.53 28.025 17.5 33 17.5ZM33 57.5C26.3838 57.5 20.3875 54.8088 16.0375 50.4637C18.0625 45.2375 23.0625 41.5 29 41.5H37C42.9425 41.5 47.9425 45.235 49.9625 50.4637C45.6125 54.8125 39.6125 57.5 33 57.5Z"
            fill="#F2F4F8"
          />
        </svg>
      )}
    </div>
  );
}
