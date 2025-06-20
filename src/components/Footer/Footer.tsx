import { cn } from "@/utils/cn";

const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        "bg-black w-full h-[7rem] flex items-center text-white px-[2.8rem] py-[0.6rem] mt-3",
        "max-mb:h-[6rem] max-mb:px-[1.25rem] max-mb:py-[0.9375rem]"
      )}
    >
      <div className="w-full flex justify-between text-sm font-normal">
        <span>@codeit - 2025</span>
        <span>15기 5팀 WHYNE</span>
        <a
          className="flex gap-[0.375rem]"
          href="https://github.com/codeit-part3-team5/whyne"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="github-icon"
            className="size-[1.25rem] select-none pointer-events-none"
            src="/images/github.png"
          />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
