import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { JOB_OPTIONS } from "@/components/constants/profile";

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
}

function SelectJob({ value, onValueChange }: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder="선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리(주제)</SelectLabel>
          {JOB_OPTIONS.map((item) => (
            <SelectItem key={item.id} value={item.lable}>
              {item.lable}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectJob };
