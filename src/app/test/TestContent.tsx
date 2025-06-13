import { useState } from "react";

import WineTaste from "@/components/WineTaste";
import useModalStore from "@/store/useModalStore";

export default function TestContent() {
  const close = useModalStore((state) => state.close);
  const [lightBold, setLightBold] = useState(5);
  const [smoothTannic, setSmoothTannic] = useState(7);

  return (
    <div className="space-y-8 w-[500px]">
      <div>
        <button className="mb-4" onClick={close}>
          닫기
        </button>

        <h1 className="text-2xl font-bold ">WineTaste 컴포넌트 테스트</h1>

        <div className="space-y-6">
          <h2 className="text-xl">수정 가능한 상태:</h2>
          <WineTaste taste={lightBold} type="lightBold" onChange={setLightBold} />
          <div className="text-sm text-gray600">현재 값: {lightBold}</div>

          <WineTaste taste={smoothTannic} type="smoothTannic" onChange={setSmoothTannic} />
          <div className="text-sm text-gray600">현재 값: {smoothTannic}</div>
        </div>

        <div className="space-y-6 mt-8">
          <h2 className="text-xl">읽기 전용 상태:</h2>
          <WineTaste readOnly taste={8} type="drySweet" />
          <WineTaste readOnly taste={3} type="softAcidic" />
        </div>
      </div>
    </div>
  );
}
