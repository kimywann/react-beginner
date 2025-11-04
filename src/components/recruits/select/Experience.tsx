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

interface Props {
  value?: string;
  onValueChange?: (value: string | undefined) => void;
}

function SelectExperience({ value, onValueChange }: Props) {
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
