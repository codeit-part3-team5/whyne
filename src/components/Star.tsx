import StarIcon from "@/assets/star-icon.svg";
type StarProps = { avgRating: number };

export default function Star({ avgRating }: StarProps) {
  const activeColor = "var(--color-purple)";
  const defaultColor = "var(--color-gray300)";

  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fillColor = avgRating >= i + 1 ? activeColor : defaultColor;

    return <StarIcon key={i} className="mr-[1px]" fill={fillColor} height="22" width="22" />;
  });

  return <div style={{ display: "flex" }}>{stars}</div>;
}
