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
    <section className="border border-gray-300 rounded-[1rem] w-full max-w-[71.25rem] h-auto flex px-[0.5rem] gap-[0.625rem]">
      <div className="w-[12.5rem] h-full bg-white rounded-md overflow-hidden flex items-end justify-center text-gray-400 text-sm">
        {data.image ? (
          <img
            alt={data.name}
            className="w-[12.5rem] h-[13.0625rem] object-contain object-bottom"
            src={data.image}
          />
        ) : (
          "이미지"
        )}
      </div>

      <div className="flex flex-col justify-between h-[13.0625rem] py-[0.5rem] mt-[1rem]">
        <div className="min-h-[6.25rem]">
          <div className="font-[600] text-[1.875rem] max-[640px]:text-[1.3rem] leading-tight break-words  max-w-[28.125rem] h-full">
            {data.name}
          </div>
          <div className="font-[400] text-[1rem] text-gray-500"> {data.region}</div>
        </div>
        <div className="bg-light-purple rounded-[0.75rem] w-[7.125rem] h-[2.3125rem] flex items-center justify-center mb-5">
          <span className="text-purple font-[700] text-[1.125rem]">
            ₩ {data.price.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
};
export default WineCard;
