"use client";

import { useEffect, useRef, useState } from "react";

import BaseProfileImg from "@/assets/base-profile.svg";
import CameraIcon from "@/assets/camera-icon.svg";

import Spinner from "../Spinner";

interface FileInputProps {
  currentImage: string;
  onImageChange: (file: File, previewUrl: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function FileInput({ currentImage, onImageChange }: FileInputProps) {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setImagePreview(currentImage || "");
  }, [currentImage]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExt = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!validExt.includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("최대 5MB 이하의 파일만 업로드 가능합니다.");
      return;
    }

    setIsUploading(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      onImageChange(file, previewUrl);
    } catch (error) {
      console.error("이미지 처리 중 오류:", error);
      alert("이미지 처리 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }

    //TODO: 이미지 업로드 로직 추가 필요
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div
      className="relative w-41 h-41 max-tb:w-15 max-tb:h-15 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
      onClick={() => imageRef.current?.click()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-full">
          <Spinner className="text-purple-500 max-mb:w-6 max-mb:h-6" size={40} />
        </div>
      ) : (
        <>
          {imagePreview ? (
            // 이미지가 있을 때
            <img
              alt="프로필 이미지"
              className="w-full h-full object-cover rounded-full"
              src={imagePreview}
              onError={(e) => {
                console.error("이미지 로드 실패:", imagePreview);
                console.error("에러 상세:", e);
              }}
              onLoad={() => console.log("이미지 로드 성공:", imagePreview)}
            />
          ) : (
            <div className="w-41 h-41 max-tb:w-15 max-tb:h-15 rounded-full hover:bg-purple-200">
              <BaseProfileImg
                alt="기본 이미지"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          )}

          {isHover && (
            <div className="flex items-center justify-center absolute inset-0 bg-purple-100 bg-opacity-30 rounded-full transition-opacity duration-200">
              <CameraIcon className="w-10 h-10 max-mb:w-6 max-mb:h-6 text-white" />
            </div>
          )}
        </>
      )}
      <input
        ref={imageRef}
        accept="image/*"
        aria-label="프로필 이미지 업로드"
        className="hidden"
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
}
