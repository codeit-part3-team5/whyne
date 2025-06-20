"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { uploadImage } from "@/apis/imagesApi";
import { getWineDetail, patchWine } from "@/apis/winesApi"; // putWines와 getWineById API 추가 필요
import addIcon from "@/assets/add-image.png";
import WineTypeDropDown from "@/components/about-wine/WineTypeDropDown";
import Button from "@/components/Button";
import BaseInput from "@/components/input/BaseInput";
import useModalStore from "@/store/useModalStore";

// 타입 정의
type WineType = "RED" | "WHITE" | "SPARKLING" | "ROSE";
type DisplayWineType = "Red" | "White" | "Sparkling" | "Rose";

interface Wine {
  id: number;
  name: string;
  price: number;
  region: string;
  type: WineType;
  image: string;
}

interface WineEditModalProps {
  wineId: number;
  initialWineData?: Wine;
}

export default function WineEditModal({ wineId, initialWineData }: WineEditModalProps) {
  const { close } = useModalStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState<DisplayWineType>("Red");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const WINE_TYPE_MAP: Record<WineType, DisplayWineType> = {
    RED: "Red",
    WHITE: "White",
    SPARKLING: "Sparkling",
    ROSE: "Rose",
  } as const;

  // 와인 데이터 로드
  useEffect(() => {
    const loadWineData = async () => {
      if (initialWineData) {
        // 이미 데이터가 전달된 경우
        setFormData(initialWineData);
      } else {
        // wineId로 데이터를 가져와야 하는 경우
        try {
          setIsLoading(true);
          const wineData = await getWineDetail(String(wineId));
          setFormData(wineData);
        } catch (error) {
          console.error("와인 데이터 로드 실패:", error);
          alert("와인 정보를 불러오는데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadWineData();
  }, [wineId, initialWineData]);

  const setFormData = (wineData: Wine) => {
    setName(wineData.name);
    setPrice(wineData.price.toString());
    setRegion(wineData.region);
    setType(WINE_TYPE_MAP[wineData.type] || "Red");
    setExistingImageUrl(wineData.image);
    setImagePreview(wineData.image);
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이전 미리보기 URL 정리
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
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
      if (!imageFile && !existingImageUrl) {
        alert("와인 이미지를 선택해 주세요.");
        return;
      }

      setIsLoading(true);

      let imageUrl = existingImageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const wineData = {
        name,
        price: Number(price),
        region,
        type: type.toUpperCase() as WineType,
        image: imageUrl!,
      };

      await patchWine(wineId, wineData);
      alert("와인 정보가 수정되었습니다.");
      close();
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !name) {
    return (
      <section>
        <div className="flex justify-center items-center h-40">
          <div>와인 정보를 불러오는 중...</div>
        </div>
      </section>
    );
  }

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

      {/* 이미지 클릭 시 input 활성화 */}
      <div className="w-[140px] h-[140px] mb-4 rounded-md border-gray-300">
        <label className="cursor-pointer block w-full h-full" htmlFor="image-upload">
          {imagePreview ? (
            <img
              alt="미리보기"
              className="w-full h-full object-cover pointer-events-none rounded-md"
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
          disabled={isLoading}
          size="lg"
          variant="primary"
          onClick={handleSubmit}
        >
          {isLoading ? "수정 중..." : "와인 수정하기"}
        </Button>
        <Button
          className="rounded-[0.75rem]"
          disabled={isLoading}
          size="sm"
          variant="secondary"
          onClick={close}
        >
          취소
        </Button>
      </div>
    </section>
  );
}
