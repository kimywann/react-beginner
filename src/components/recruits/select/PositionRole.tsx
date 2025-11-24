import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { POSITION_ROLE_OPTIONS } from "@/components/constants/profile";
import { cn } from "@/lib/utils";

interface Props {
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  className?: string;
}

function SelectPositionRole({ value, onValueChange, className }: Props) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onValueChange?.(val === "all" ? undefined : val)}
    >
      <SelectTrigger
        data-testid="select-position"
        aria-label="희망 포지션 선택"
        className={cn("w-[230px]", className)}
      >
        <SelectValue placeholder="전체" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>희망 포지션</SelectLabel>
          <SelectItem value="all">전체</SelectItem>
          {POSITION_ROLE_OPTIONS.map((item) => (
            <SelectItem key={item.id} value={item.lable}>
              {item.lable}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectPositionRole };
