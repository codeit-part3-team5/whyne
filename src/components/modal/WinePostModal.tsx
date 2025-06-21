"use client";

import Image from "next/image";
import { useState } from "react";

import { uploadImage } from "@/apis/imagesApi";
import { postWines } from "@/apis/winesApi";
import addIcon from "@/assets/add-image.png";
import WineTypeDropDown from "@/components/about-wine/WineTypeDropDown";
import Button from "@/components/Button";
import BaseInput from "@/components/input/BaseInput";
import useModalStore from "@/store/useModalStore";

export default function WinePostModal({ onSuccess }: { onSuccess?: () => void }) {
  const { close } = useModalStore();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState<"Red" | "White" | "Sparkling" | "Rose">("Red");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name.trim()) {
        alert("와인 이름을 입력해 주세요.");
        return;
      }
      if (!price || isNaN(Number(price)) || Number(price) <= 0) {
        alert("올바른 가격을 입력해 주세요.");
        return;
      }
      if (!region.trim()) {
        alert("원산지를 입력해 주세요.");
        return;
      }
      if (!imageFile) {
        alert("와인 이미지를 선택해 주세요.");
        return;
      }

      const imageUrl = await uploadImage(imageFile);

      await postWines({
        name,
        price: Number(price),
        region,
        type: type.toUpperCase() as "RED" | "WHITE" | "SPARKLING",
        image: imageUrl,
      });

      alert("와인이 등록되었습니다.");

      onSuccess?.();
      close();
    } catch (err) {
      console.error("등록 실패", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <section>
      <div className="font-[500] text-[1rem] pb-[0.425rem]">와인 이름</div>
      <BaseInput
        className="mb-2"
        placeholder="와인 이름을 입력해 주세요."
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="font-[500] text-[1rem] py-[0.425rem]">가격</div>
      <BaseInput
        className="mb-2"
        placeholder="가격은 숫자만 입력이 가능합니다."
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="font-[500] text-[1rem] py-[0.425rem]">원산지</div>
      <BaseInput
        className="mb-2"
        placeholder="원산지를 입력해 주세요."
        type="text"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />

      <div className="font-[500] text-[1rem] py-[0.425rem]">타입</div>
      <WineTypeDropDown selected={type} onChange={setType} />

      <div className="font-[500] text-[1rem] py-[0.425rem] mt-4">와인 이미지</div>
      <input
        accept="image/*"
        className="absolute opacity-0 w-0 h-0"
        id="image-upload"
        type="file"
        onChange={handleImageChange}
      />

      <div className="w-[140px] h-[140px] mb-4 rounded-md border-gray-300">
        <label className="cursor-pointer block w-full h-full" htmlFor="image-upload">
          {imagePreview ? (
            <img
              alt="미리보기"
              className="w-full h-full object-cover pointer-events-none select-none"
              src={imagePreview}
            />
          ) : (
            <Image
              alt="이미지 추가"
              className="object-contain"
              height={140}
              src={addIcon}
              width={140}
            />
          )}
        </label>
      </div>
      <div className="flex flex-row gap-4 mt-3">
        <Button
          className="w-[18.375rem] rounded-[0.75rem]"
          size="lg"
          variant="primary"
          onClick={handleSubmit}
        >
          와인 등록하기
        </Button>
        <Button className="rounded-[0.75rem]" size="sm" variant="secondary" onClick={close}>
          취소
        </Button>
      </div>
    </section>
  );
}
