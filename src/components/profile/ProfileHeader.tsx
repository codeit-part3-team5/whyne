"use client";

import { useState } from "react";

import Button from "../Button";
import FileInput from "../input/FileInput";
import Input from "../input/Input";

export default function ProfileHeader() {
  const [currentNickName, setCurrentNickName] = useState("완다"); // 실제 저장된 닉네임 (표시용)
  const [inputNickName, setInputNickName] = useState("완다"); // 입력 필드의 닉네임
  const [profileImage, setProfileImage] = useState<string>(""); // 현재 프로필 이미지 URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택된 파일

  // 이미지 변경 핸들러
  const handleImageChange = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setProfileImage(previewUrl); // 미리보기 URL로 즉시 업데이트
    console.log("선택된 파일:", file);
    console.log("미리보기 URL:", previewUrl);
  };

  // 프로필 변경 처리
  const handleProfileUpdate = async () => {
    try {
      // 닉네임이나 이미지가 변경된 경우 API 호출
      const formData = new FormData();
      formData.append("nickname", inputNickName);

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      // TODO: 실제 API 호출
      console.log("프로필 업데이트:", { nickName: inputNickName, hasImage: !!selectedFile });

      // API 성공 후 실제 닉네임 업데이트 및 상태 초기화
      setCurrentNickName(inputNickName); // 성공 시에만 실제 닉네임 업데이트
      setSelectedFile(null);

      alert("프로필이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("프로필 변경 실패:", error);
      alert("프로필 변경에 실패했습니다.");
      // 실패 시 입력값을 원래 닉네임으로 되돌림
      setInputNickName(currentNickName);
    }
  };

  return (
    <div className="bg-white px-5 py-7 min-w-70 h-130 rounded-2xl border border-gray-300 shadow-md max-tb:w-full max-tb:h-auto max-tb:p-6 max-tb:px-8 max-mb:p-5">
      <div className="flex flex-col max-tb:flex-row items-center gap-8 max-tb:gap-4 mb-4">
        <FileInput currentImage={profileImage} onImageChange={handleImageChange} />
        <div>
          <h1 className="text-xl font-bold">{currentNickName}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-23 max-tb:mt-8 max-tb:flex-row">
        <Input
          className="flex-1"
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          value={inputNickName}
          onChange={(e) => setInputNickName(e.target.value)}
        />
        <Button className="text-sm self-end min-h-[42px]" size="fit" onClick={handleProfileUpdate}>
          변경하기
        </Button>
      </div>
    </div>
  );
}
