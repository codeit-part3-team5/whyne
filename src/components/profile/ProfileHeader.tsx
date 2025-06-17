"use client";

import { useProfile } from "@/hooks/useProfile";

import Button from "../Button";
import FileInput from "../input/FileInput";
import Input from "../input/Input";

export default function ProfileHeader() {
  const {
    userInfo,
    inputNickName,
    profileImage,
    isUpdating,
    isLoading,
    error,
    setInputNickName,
    handleImageChange,
    handleProfileUpdate,
    clearError,
    hasChanges,
  } = useProfile();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="bg-white px-5 py-7 min-w-70 h-130 rounded-2xl border border-gray-300 shadow-md max-tb:w-full max-tb:h-auto max-tb:p-6 max-tb:px-8 max-mb:p-5">
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">사용자 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 사용자 정보를 불러오지 못했을 때
  if (!userInfo) {
    return (
      <div className="bg-white px-5 py-7 min-w-70 h-130 rounded-2xl border border-gray-300 shadow-md max-tb:w-full max-tb:h-auto max-tb:p-6 max-tb:px-8 max-mb:p-5">
        <div className="flex items-center justify-center h-full">
          <div className="text-red-500">{error || "사용자 정보를 불러올 수 없습니다."}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-5 py-7 min-w-70 h-130 rounded-2xl border border-gray-300 shadow-md max-tb:w-full max-tb:h-auto max-tb:p-6 max-tb:px-8 max-mb:p-5">
      {/* 에러 메시지 표시 */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-red-600 text-sm">{error}</span>
            <button
              aria-label="에러 메시지 닫기"
              className="text-red-400 hover:text-red-600 ml-2"
              type="button"
              onClick={clearError}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col max-tb:flex-row items-center gap-8 max-tb:gap-4 mb-4">
        <FileInput currentImage={profileImage} onImageChange={handleImageChange} />
        <div>
          <h1 className="text-xl font-bold">{userInfo.nickname}</h1>
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
        <Button
          className="text-sm self-end min-h-[42px]"
          disabled={!hasChanges || isUpdating}
          size="fit"
          onClick={handleProfileUpdate}
        >
          {isUpdating ? "변경 중..." : "변경하기"}
        </Button>
      </div>
    </div>
  );
}
