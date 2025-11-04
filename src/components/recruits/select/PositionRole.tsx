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

interface Props {
  value?: string;
  onValueChange?: (value: string | undefined) => void;
}

function SelectPositionRole({ value, onValueChange }: Props) {
  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onValueChange?.(val === "all" ? undefined : val)}
    >
      <SelectTrigger className="w-[230px]">
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
