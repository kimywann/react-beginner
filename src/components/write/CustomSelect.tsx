import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  items: { id: number; lable: string }[];
  onChange: (value: string) => void;
}

export function CustomSelect({
  label,
  placeholder = "선택",
  value,
  items,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Label className="text-primary text-base">{label}</Label>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="!h-[40px] w-[300px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.lable}>
                {item.lable}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
