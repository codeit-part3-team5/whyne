import StarIcon from "@/assets/icons/star-icon.svg";

export default function Star({ avgRating }: { avgRating: number }) {
  const activeColor = "var(--color-purple)";
  // const inactiveColor = "var(--color-gray300)";
  console.log(avgRating);

  return (
    <div>
      <StarIcon fill={activeColor} height="24" width="24" />
    </div>
  );
}
