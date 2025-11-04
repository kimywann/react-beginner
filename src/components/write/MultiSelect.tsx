import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, ChevronDown } from "lucide-react";

interface MultiSelectItem {
  id: number;
  lable: string;
}

interface Props {
  label: string;
  placeholder?: string;
  value: string[];
  items: MultiSelectItem[];
  onChange: (value: string[]) => void;
}

export function MultiSelect({
  label,
  placeholder = "선택",
  value,
  items,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = (itemValue: string) => {
    const newValue = value.includes(itemValue)
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];
    onChange(newValue);
  };

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-2">
      <Label className="text-primary text-base">{label}</Label>
      <Button
        variant="outline"
        className="h-[40px] w-[300px] items-center justify-between px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-1 items-center gap-1 overflow-hidden">
          {value.length === 0 ? (
            <span className="text-muted-foreground text-sm">{placeholder}</span>
          ) : (
            <div className="scrollbar-hide flex flex-1 items-center gap-1 overflow-x-auto">
              {value.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="flex shrink-0 items-center gap-1 text-sm whitespace-nowrap"
                >
                  {item}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(item);
                    }}
                    className="ml-1 rounded hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-[300px] overflow-auto rounded-md border bg-white p-2 shadow-lg">
          {items.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={value.includes(item.lable)}
                onChange={() => handleToggle(item.lable)}
                className="h-4 w-4"
              />
              <span className="text-sm">{item.lable}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
