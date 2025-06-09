import useModalStore from "@/store/useModalStore";

export default function TestContent() {
  const close = useModalStore((state) => state.close);

  return (
    <div>
      <div>테스트 모달입니다.</div>
      <div>모달 어쩌구저쩌구</div>
      <div>
        <button onClick={close}>취소</button>
      </div>
    </div>
  );
}
