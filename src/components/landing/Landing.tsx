import Link from "next/link";

import Button from "../Button";

const Landing = () => {
  const landingImagePath = "/images/landing/";
  return (
    <div className="flex flex-col gap-[10rem] max-tb:gap-[5rem] max-mb:gap-[3rem]">
      <picture>
        <source media="(max-width:24.4375rem)" srcSet={`${landingImagePath}sm_01.png`} />
        <source media="(max-width:46.5rem)" srcSet={`${landingImagePath}md_01.png`} />
        <img src={`${landingImagePath}lg_01.png`} />
      </picture>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-[6rem] max-mb:gap-[3rem] max-w-[43.75rem]">
          <picture>
            <source media="(max-width:24.4375rem)" srcSet={`${landingImagePath}sm_02.png`} />
            <img src={`${landingImagePath}lg_02.png`} />
          </picture>

          <picture>
            <source media="(max-width:24.4375rem)" srcSet={`${landingImagePath}sm_03.png`} />
            <img src={`${landingImagePath}lg_03.png`} />
          </picture>
          <picture>
            <source media="(max-width:24.4375rem)" srcSet={`${landingImagePath}sm_04.png`} />
            <img src={`${landingImagePath}lg_04.png`} />
          </picture>
        </div>
        <Link
          className="mt-[6.5rem] mb-[6.8125rem] max-tb:mt-[5rem] max-tx:mb-[4.5rem] max-mb:mt-[4rem] max-mb:mb-[3.875rem]"
          href="/wines"
        >
          <Button className="w-[279px] py-[1rem] px-[6rem] rounded-[6.25rem]">와인 보러가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
