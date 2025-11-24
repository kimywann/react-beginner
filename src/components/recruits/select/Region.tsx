import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { REGION_OPTIONS } from "@/components/constants/profile";
import { cn } from "@/lib/utils";

interface Props {
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
}

function SelectRegion({ value, onValueChange, className }: Props) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onValueChange?.(val === "all" ? undefined : val)}
    >
      <SelectTrigger
        data-testid="select-region"
        aria-label="활동 지역 선택"
        className={cn("w-[230px]", className)}
      >
        <SelectValue placeholder="전체" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>활동 지역</SelectLabel>
          <SelectItem value="all">전체</SelectItem>
          {REGION_OPTIONS.map((item) => (
            <SelectItem key={item.id} value={item.lable}>
              {item.lable}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectRegion };
