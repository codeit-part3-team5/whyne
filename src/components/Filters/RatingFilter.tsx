export default function RatingFilter() {
  return (
    <section className="flex flex-col gap-3 text-gray-800 mt-4">
      <div className="font-[700] text-[20px] mb-2">RATING</div>
      <label className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center">
        {/* peer 는 테일윈드를 사용하여 형제 요소에 스타일을 바꿀 수있는 속성입니다  */}
        <input
          className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
          type="checkbox"
        />
        <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
        <div>전체</div>
      </label>
      <label className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center">
        <input
          className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
          type="checkbox"
        />
        <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
        <div>4.5 - 5.0</div>
      </label>
      <label className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center">
        <input
          className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
          type="checkbox"
        />
        <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
        <div>4.0 - 4.5</div>
      </label>
      <label className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center">
        <input
          className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
          type="checkbox"
        />
        <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
        <div>3.5 - 4.0</div>
      </label>
      <label className="relative flex gap-4 text-[1rem] font-[500] cursor-pointer items-center">
        <input
          className="peer w-[20px] h-[20px] rounded-md appearance-none bg-gray-100 border border-gray-300 cursor-pointer relative"
          type="checkbox"
        />
        <div className="pointer-events-none absolute w-[10px] h-[10px] bg-purple rounded-[3px] peer-checked:block hidden ml-[5px]" />
        <div>3.0 - 3.5</div>
      </label>
    </section>
  );
}
