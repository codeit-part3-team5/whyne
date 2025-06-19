"use client";

import { useState } from "react";

import { setDevelopmentToken } from "@/apis/winesApi";

export default function TokenSetterPage() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleSetToken = () => {
    if (!token.trim()) {
      setMessage("토큰을 입력해주세요");
      return;
    }

    try {
      setDevelopmentToken(token);
      setMessage("토큰이 성공적으로 설정되었습니다!");
    } catch (error) {
      setMessage("토큰 설정 중 오류가 발생했습니다: " + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">개발 모드 토큰 설정</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="token">
            AccessToken 입력
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
            id="token"
            placeholder="API 테스트를 위한 JWT 토큰을 여기에 붙여넣으세요..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleSetToken}
        >
          토큰 설정하기
        </button>
        {message && (
          <div
            className={`mt-4 p-3 rounded ${message.includes("오류") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
          >
            {message}
          </div>
        )}
        <div className="mt-6 p-4 bg-gray-100 rounded text-sm">
          <h2 className="font-bold mb-2">사용 방법:</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>스웨거 또는 다른 소스에서 유효한 JWT 토큰을 얻습니다.</li>
            <li>위 텍스트 영역에 토큰을 붙여넣습니다.</li>
            <li>"토큰 설정하기" 버튼을 클릭합니다.</li>
            <li>이제 인증이 필요한 API를 테스트할 수 있습니다.</li>
          </ol>
          <p className="mt-4 text-red-600">
            <strong>주의:</strong> 이 페이지는 개발 목적으로만 사용하세요. 실제 프로덕션 환경에서는
            사용하지 마십시오.
          </p>
        </div>
      </div>
    </div>
  );
}
