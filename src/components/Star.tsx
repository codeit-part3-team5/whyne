type StarProps = { avgRating: number };
import StarIcon from "@/assets/star-icon.svg";
import StarMiniIcon from "@/assets/star-mini-icon.svg";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Star({ avgRating }: StarProps) {
  const activeColor = "var(--color-purple)";
  const defaultColor = "var(--color-gray300)";

  const isMobile = useMediaQuery("(max-width: 24.375rem)");
  const size = isMobile ? 14 : 22;
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fillColor = avgRating >= i + 1 ? activeColor : defaultColor;

    return isMobile ? (
      <StarMiniIcon key={i} fill={fillColor} height={size} width={size} />
    ) : (
      <StarIcon key={i} fill={fillColor} height={size} width={size} />
    );
  });

  return <div className="flex">{stars}</div>;
}
