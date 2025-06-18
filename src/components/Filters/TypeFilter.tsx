"use client";

interface TypeFilterProps {
  selectedType: string;
  onChange: (type: string) => void;
}

const TYPES = ["Red", "White", "Sparkling"];

export default function TypeFilter({ selectedType, onChange }: TypeFilterProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="font-[700] text-gray-800 text-[20px] mb-2">WINES TYPE</div>
      <div className="flex gap-5">
        {TYPES.map((type) => (
          <div
            key={type}
            className={`inline-flex items-center justify-center h-[42px] px-4 border rounded-full cursor-pointer transition
              ${
                selectedType === type
                  ? "bg-purple text-white border-purple"
                  : "bg-white text-black border-gray-300 hover:bg-purple hover:text-white"
              }`}
            onClick={() => onChange(selectedType === type ? "" : type)}
          >
            {type}
          </div>
        ))}
      </div>
    </section>
  );
}
