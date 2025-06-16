import { useReviewStore } from "@/store/useReviewStore";

export default function ReviewWrite() {
  const { content, setContent } = useReviewStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form className="h-[7.5rem] flex self-stretch" name="reviewTextArea">
      <textarea
        className="flex px-5 py-3.5 items-center gap-2.5 flex-[1_0_0] rounded-2xl border border-gray300 bg-white resize-none text-base font-normal leading-6 text-gray800 placeholder:text-gray500 focus:border-primary focus:outline-none focus:ring-0"
        placeholder="후기를 작성해주세요"
        value={content}
        onChange={handleTextChange}
      />
    </form>
  );
}
