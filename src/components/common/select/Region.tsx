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

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

function SelectRegion({ value, onValueChange, placeholder = "지역" }: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>카테고리(주제)</SelectLabel>
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
