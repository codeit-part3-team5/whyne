import { generateSafeFileName } from "@/utils/fileUtil";

import { axiosAuthClient } from "./axios/axiosConfig";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();

    // 파일명을 안전한 형태로 변경
    const safeFile = generateSafeFileName(file);
    formData.append("image", safeFile);
    const response = await axiosAuthClient.post("/images/upload", formData);

    return response.data.url;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    throw error;
  }
};
