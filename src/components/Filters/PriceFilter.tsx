"use client";

interface PriceFilterProps {
  selectedRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export default function PriceFilter({ selectedRange, onChange }: PriceFilterProps) {
  const [minValue, maxValue] = selectedRange;
  const maxPrice = 1000000;
  const minPrice = 0;
  const steps = 100000;

  const getSafeLeft = (value: number) => {
    const percent = (value / maxPrice) * 100;
    return Math.min(Math.max(percent, 5), 95);
  };

  const handleMinMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    onChange([Math.min(newMin, maxValue), Math.max(newMin, maxValue)]);
  };

  const handleMaxMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onChange([Math.min(minValue, newMax), Math.max(minValue, newMax)]);
  };

  return (
    <div className="font-[700] text-[20px] text-gray-800 mt-4">
      <div className="py-6">PRICE</div>

      <div className="relative w-full max-w-[300px] h-[24px] mb-1">
        <span
          className="absolute -top-3 text-purple text-[1rem] font-[500] min-w-[80px] text-center"
          style={{
            left: `${getSafeLeft(minValue)}%`,
            transform: "translateX(-50%)",
          }}
        >
          ₩ {minValue.toLocaleString()}
        </span>
        <span
          className="absolute -top-3 text-purple text-[1rem] font-[500] min-w-[100px] text-center"
          style={{
            left: `${getSafeLeft(maxValue)}%`,
            transform: "translateX(-50%)",
          }}
        >
          ₩ {maxValue.toLocaleString()}
        </span>
      </div>

      <div className="relative w-full max-w-[284px] h-[6px] bg-gray-200 rounded-full mb-6">
        <div
          className="absolute h-full bg-purple rounded-full"
          style={{
            left: `${(Math.min(minValue, maxValue) / maxPrice) * 100}%`,
            width: `${(Math.abs(maxValue - minValue) / maxPrice) * 100}%`,
          }}
        />

        <input
          aria-label="최소가격"
          className="absolute w-full max-w-[230px] h-[6px] appearance-none cursor-pointer"
          max={maxPrice}
          min={minPrice}
          step={steps}
          type="range"
          value={minValue}
          onChange={handleMinMove}
        />
        <input
          aria-label="최대가격"
          className="absolute w-full max-w-[284px] h-[6px] appearance-none cursor-pointer"
          max={maxPrice}
          min={minPrice}
          step={steps}
          type="range"
          value={maxValue}
          onChange={handleMaxMove}
        />
      </div>
    </div>
  );
}
