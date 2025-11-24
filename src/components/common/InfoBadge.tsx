import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value?: string;
  color?: "default" | "green" | "blue" | "red" | "gray" | "white";
  className?: string;
}

const badgeThemes = {
  default: "border-none bg-gray-200 text-gray-800",
  green: "border-none bg-green-100 text-green-700 font-semibold",
  blue: "border-none bg-blue-100 text-blue-700 font-semibold",
  red: "border-none bg-red-100 text-red-700 font-semibold",
  gray: "bg-gray-200 text-gray-800",
  white: "bg-slate-100 text-slate-700 font-bold",
};

/**
 * 라벨과 값을 함께 표시하는 정보 배지 컴포넌트
 * @param label - 배지에 표시할 라벨 텍스트
 * @param value - 배지 옆에 표시할 값
 * @param color - 배지의 색상 변형 (default, green, blue, red, gray)
 * @param className - 추가 CSS 클래스
 */

export function InfoBadge({
  label,
  value,
  color = "default",
  className = "",
}: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge variant="outline" className={badgeThemes[color]}>
        {label}
      </Badge>
      <p className="text-muted-foreground">{value}</p>
    </div>
  );
}
