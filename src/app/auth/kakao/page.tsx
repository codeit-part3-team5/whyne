import { Suspense } from "react";

import KakaoRedirectPage from "./KakaoRedirectPage";

const KakaoAuthPage = () => {
  return (
    <Suspense>
      <KakaoRedirectPage />
    </Suspense>
  );
};

export default KakaoAuthPage;
