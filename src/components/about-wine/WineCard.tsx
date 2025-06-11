type WineCardProps = {
  data: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: string;
  };
};

const WineCard: React.FC<WineCardProps> = ({ data }) => {
  return (
    <section className="border border-gray-300 rounded-[16px] w-[1140px] h-[260px] flex px-8 gap-10">
      <div className="w-[200px] h-full bg-white rounded-md flex items-end justify-center text-gray-400 text-sm">
        {data.image ? (
          <img
            alt={data.name}
            className="w-[200px] h-[209px] object-contain object-bottom"
            src={data.image}
          />
        ) : (
          "이미지"
        )}
      </div>

      <div className="flex flex-col justify-between h-[209px] py-2 mt-6">
        <div className="min-h-[100px]">
          <div className="font-[600] text-[30px] leading-tight break-words max-w-[450px] h-full">
            {data.name}
          </div>
          <div className="font-[400] text-[16px] text-gray-500 m">{data.region}</div>
        </div>
        <div className="bg-light-purple rounded-[12px] w-[114px] h-[37px] flex items-center justify-center mt-auto">
          <span className="text-purple font-[700] text-[18px]">
            ₩ {data.price.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};
export default WineCard;
