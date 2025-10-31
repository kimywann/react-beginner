import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { JOB_ROLE_OPTIONS } from "@/components/constants/profile";

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

function SelectJobRole({
  value,
  onValueChange,
  placeholder = "포지션 선택",
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리(주제)</SelectLabel>
          {JOB_ROLE_OPTIONS.map((item) => (
            <SelectItem key={item.id} value={item.lable}>
              {item.lable}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectJobRole };
