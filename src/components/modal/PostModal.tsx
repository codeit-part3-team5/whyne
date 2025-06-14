import Image from "next/image";

import addIcon from "@/assets/add-image.png";
import WineTypeDropDown from "@/components/about-wine/WineTypeDropDown";
import Button from "@/components/Button";

import BaseInput from "../input/BaseInput";

export default function PostModal() {
  return (
    <section>
      <div className="font-[500] text-[1rem] pb-[0.425rem]">와인 이름</div>
      <BaseInput
        className="mb-2"
        name="no-label"
        placeholder="와인 이름을 입력해 주세요."
        type="text"
      />
      <div className="font-[500] text-[1rem] py-[0.425rem]">가격</div>
      <BaseInput className="mb-2" name="no-label" placeholder="가격을 입력해 주세요." type="text" />
      <div className="font-[500] text-[1rem] py-[0.425rem]">원산지</div>
      <BaseInput
        className="mb-2"
        name="no-label"
        placeholder="원산지를 입력해 주세요."
        type="text"
      />
      <div className="font-[500] text-[1rem] py-[0.425rem]">타입</div>
      <WineTypeDropDown />
      <div className="mt-6">
        <Image alt="이미지 추가" className="mb-4" height={140} src={addIcon} width={140} />
      </div>
      <div className="flex flex-row gap-4 mt-3">
        <Button className="w-[18.375rem] rounded-[0.75rem]" size="lg" variant="primary">
          와인 등록하기
        </Button>
        <Button className="rounded-[0.75rem]" size="sm" variant="secondary">
          취소
        </Button>
      </div>
    </section>
  );
}
