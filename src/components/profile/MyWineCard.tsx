"use client";

import { MyWine } from "@/types/Wine";

import { BaseCard } from "./BaseCard";

interface MyWineCardProps {
  myWines: MyWine[];
}

export default function MyWineCard({ myWines }: MyWineCardProps) {
  const handleEdit = (wine: MyWine) => {
    // 와인 수정 로직
    console.log("Edit wine:", wine);
  };

  const handleDelete = (wine: MyWine) => {
    // 와인 삭제 로직
    console.log("Delete wine:", wine);
  };

  return (
    <BaseCard
      dropdownOptions={{ firstText: "수정하기", secondText: "삭제하기" }}
      getId={(wine) => wine.id}
      items={myWines}
      renderContent={(wine) => <WineCardContent wine={wine} />}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
    // <section className="flex flex-col gap-2 max-tb:gap-4">
    //   {myWines.map((wine) => (
    //     <div
    //       key={wine.id}
    //       className="bg- py-6 px-10 max-mb:py-4 max-mb:px-5 rounded-2xl shadow-sm border border-gray-300"
    //     >
    //       <div className="flex gap-6 relative items-center max-md:gap-5">
    //         {/* 와인 이미지 - 고정 크기 */}
    //         <div className="flex-shrink-0 w-50 h-52 max-md:w-15 max-md:h-40 bg-white rounded-md overflow-hidden flex items-center justify-center text-gray-400 text-sm">
    //           {wine.image ? (
    //             <div className="w-full h-full flex items-center justify-center">
    //               <img
    //                 alt={wine.name}
    //                 className="w-full h-full object-contain object-center"
    //                 src={wine.image}
    //               />
    //             </div>
    //           ) : (
    //             "이미지"
    //           )}
    //         </div>

    //         {/* 텍스트 정보 - 유동적 높이 */}
    //         <div className="flex-1 flex flex-col justify-between min-h-52 max-md:min-w-46">
    //           <div className="flex-1">
    //             <h3 className="font-semibold text-3xl max-mb:text-xl leading-tight break-words mb-3">
    //               {wine.name}
    //             </h3>
    //             <p className="text-gray-400 max-mb:text-base">{wine.region}</p>
    //           </div>

    //           {/* 가격 - 하단 고정 */}
    //           <div className="mt-4">
    //             <div className="bg-light-purple rounded-lg w-30 h-9 flex items-center justify-center">
    //               <span className="text-purple font-bold text-md">
    //                 ₩ {wine.price.toLocaleString()}
    //               </span>
    //             </div>
    //           </div>
    //         </div>

    //         {/* 드롭다운 - 우상단 고정 */}
    //         <div
    //           className="flex-shrink-0 self-start"
    //           ref={(el) => {
    //             dropdownRefs.current[wine.id] = el;
    //           }}
    //         >
    //           <button
    //             aria-expanded={openDropdownId === wine.id}
    //             aria-haspopup="menu"
    //             aria-label="와인 옵션 메뉴"
    //             onClick={() => handleDropdownToggle(wine.id)}
    //           >
    //             <Ellipse height={ellipseSize} width={ellipseSize} />
    //           </button>
    //           {openDropdownId === wine.id && (
    //             <div className="absolute right-0 top-8 z-10">
    //               <DropDown
    //                 firstText="수정하기"
    //                 secondText="삭제하기"
    //                 size={isMobile ? "small" : "default"}
    //               />
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </section>
  );
}

function WineCardContent({ wine }: { wine: MyWine }) {
  return (
    <div className="flex gap-6 items-center max-md:gap-5">
      {/* 와인 이미지 - 고정 크기 */}
      <div className="flex-shrink-0 w-50 h-52 max-md:w-15 max-md:h-40 bg-white rounded-md overflow-hidden flex items-center justify-center text-gray-400 text-sm">
        {wine.image ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              alt={wine.name}
              className="w-full h-full object-contain object-center"
              src={wine.image}
            />
          </div>
        ) : (
          "이미지"
        )}
      </div>

      {/* 텍스트 정보 - 유동적 높이 */}
      <div className="flex-1 flex flex-col justify-between min-h-52 max-md:min-w-46">
        <div className="flex-1">
          <h3 className="font-semibold text-3xl max-mb:text-xl leading-tight break-words mb-3">
            {wine.name}
          </h3>
          <p className="text-gray-400 max-mb:text-base">{wine.region}</p>
        </div>

        {/* 가격 - 하단 고정 */}
        <div className="mt-4">
          <div className="bg-light-purple rounded-lg w-30 h-9 flex items-center justify-center">
            <span className="text-purple font-bold text-md">₩ {wine.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
