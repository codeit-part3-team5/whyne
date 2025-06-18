// hooks/useProfile.ts
import { useEffect, useState } from "react";

import { uploadImage } from "@/apis/imagesApi";
import { me, updateUserProfile } from "@/apis/usersApi";
import { User } from "@/types/User";

interface UseProfileReturn {
  userInfo: User | null;
  inputNickName: string;
  profileImage: string;
  selectedFile: File | null;
  isUpdating: boolean;
  isLoading: boolean;
  error: string | null;

  setInputNickName: (nickname: string) => void;
  handleImageChange: (file: File, previewUrl: string) => void;
  handleProfileUpdate: () => Promise<void>;
  clearError: () => void;

  hasChanges: boolean;
}

export const useProfile = (): UseProfileReturn => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [inputNickName, setInputNickName] = useState("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await me();
      setUserInfo(userData);
      setInputNickName(userData.nickname);
      setProfileImage(userData.image || "");
    } catch (error) {
      console.error("사용자 정보 로드 실패: ", error);
      setError("사용자 정보를 불러올 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 이미지 변경 핸들러
  const handleImageChange = (file: File, previewUrl: string) => {
    setSelectedFile(file);
    setProfileImage(previewUrl);
    setError(null); // 에러 초기화
  };

  // 프로필 업데이트
  const handleProfileUpdate = async () => {
    if (!userInfo) return;

    setIsUpdating(true);
    setError(null);

    try {
      let uploadedImageUrl = profileImage;

      // 새 이미지가 선택된 경우 업로드
      if (selectedFile) {
        uploadedImageUrl = await uploadImage(selectedFile);
      }

      // 프로필 업데이트 API 호출
      await updateUserProfile(inputNickName, uploadedImageUrl);

      // 상태 업데이트
      const updatedUserInfo: User = {
        ...userInfo,
        nickname: inputNickName,
        image: uploadedImageUrl,
      };

      setUserInfo(updatedUserInfo);
      setProfileImage(uploadedImageUrl);
      setSelectedFile(null);
    } catch (error: any) {
      console.error("프로필 변경 실패:", error);

      // 에러 메시지 설정
      if (error.message?.includes("로그인") || error.message?.includes("인증")) {
        setError(error.message);
      } else {
        setError("프로필 변경에 실패했습니다.");
      }

      // 실패 시 상태 되돌리기
      if (userInfo) {
        setInputNickName(userInfo.nickname);
        setProfileImage(userInfo.image || "");
        setSelectedFile(null);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // 에러 초기화
  const clearError = () => {
    setError(null);
  };

  // 변경사항 감지
  const hasChanges = userInfo && (inputNickName !== userInfo.nickname || selectedFile !== null);

  return {
    userInfo,
    inputNickName,
    profileImage,
    selectedFile,
    isUpdating,
    isLoading,
    error,

    setInputNickName,
    handleImageChange,
    handleProfileUpdate,
    clearError,

    hasChanges: Boolean(hasChanges),
  };
};
