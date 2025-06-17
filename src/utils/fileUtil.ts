/**
 * 파일명을 안전한 형태로 변경하는 함수
 * 한글, 특수문자 등이 포함된 파일명을 영문과 숫자로만 구성된 안전한 파일명으로 변경
 */
export const generateSafeFileName = (originalFile: File, prefix = "file"): File => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalFile.name.split(".").pop()?.toLowerCase() || "jpg";

  // 영문과 숫자로만 구성된 안전한 파일명 생성
  const safeFileName = `${prefix}_${timestamp}_${randomStr}.${extension}`;

  // 새로운 File 객체 생성
  return new File([originalFile], safeFileName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};

/**
 * 파일 크기를 사람이 읽기 쉬운 형태로 변환
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * 파일 확장자 검증
 */
export const validateFileExtension = (file: File, allowedExtensions: string[]): boolean => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
};

/**
 * 파일 업로드 전 검증
 */
export const validateFileForUpload = (
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { isValid: boolean; error?: string } => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
    allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"],
  } = options;

  // 파일 크기 검증
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `파일 크기가 너무 큽니다. 최대 ${formatFileSize(maxSize)}까지 업로드 가능합니다.`,
    };
  }

  // 파일 타입 검증
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "지원하지 않는 파일 형식입니다.",
    };
  }

  // 파일 확장자 검증
  if (!validateFileExtension(file, allowedExtensions)) {
    return {
      isValid: false,
      error: `허용된 확장자: ${allowedExtensions.join(", ")}`,
    };
  }

  return { isValid: true };
};
