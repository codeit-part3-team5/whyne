import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 16, className }: SpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
}
