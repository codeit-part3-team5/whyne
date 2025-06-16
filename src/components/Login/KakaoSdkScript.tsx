"use client";

import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}
const KakaoSdkScript: React.FC = () => {
  return (
    <Script
      async
      crossOrigin="anonymous"
      integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
      onLoad={() => {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
        if (typeof window.Kakao !== "undefined") {
          const { Kakao } = window;
          Kakao.init(appKey);
        }
      }}
    />
  );
};

export default KakaoSdkScript;
