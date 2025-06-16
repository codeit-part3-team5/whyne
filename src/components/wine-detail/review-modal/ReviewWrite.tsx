export default function ReviewWrite() {
  return (
    <form action="" className="h-[7.5rem] flex self-stretch" name="reviewTextArea">
      <textarea
        className="flex px-5 py-3.5 items-center gap-2.5 flex-[1_0_0] rounded-2xl border border-gray300 bg-white"
        placeholder="후기를 작성해주세요"
      />
    </form>
  );
}
