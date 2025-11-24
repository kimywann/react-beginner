import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { EXPERIENCE_OPTIONS } from "@/components/constants/profile";
import { cn } from "@/lib/utils";

interface Props {
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
}

function SelectExperience({ value, onValueChange, className }: Props) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onValueChange?.(val === "all" ? undefined : val)}
    >
      <SelectTrigger
        data-testid="select-experience"
        aria-label="관련 경력 선택"
        className={cn("w-[230px]", className)}
      >
        <SelectValue placeholder="전체" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>관련 경력</SelectLabel>
          <SelectItem value="all">전체</SelectItem>
          {EXPERIENCE_OPTIONS.map((item) => (
            <SelectItem key={item.id} value={item.lable}>
              {item.lable}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectExperience };
