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
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

function SelectExperience({
  value,
  onValueChange,
  placeholder = "경력",
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리(주제)</SelectLabel>
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
