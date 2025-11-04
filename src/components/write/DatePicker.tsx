import { useState, useEffect, useRef } from "react";
import { Button, Calendar, Label } from "@/components/ui";
import { Calendar1 } from "lucide-react";

interface Props {
  label: string;
  value: Date | string;
  onChange: (value: Date) => void;
}

export function DatePicker({ label, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value instanceof Date ? value : new Date(value),
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newDate = value instanceof Date ? value : new Date(value);
    setDate(newDate);
  }, [value]);

  const handleCalendarClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate);
      setIsOpen(false);
    }
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
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
    <div ref={calendarRef} className="relative flex flex-col gap-2">
      <Label className="text-primary text-base">{label}</Label>
      <Button
        variant="outline"
        className="flex h-[40px] w-[300px] items-center justify-between border-1 !bg-white shadow-xs"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-muted-foreground">
          {date?.toLocaleDateString()}
        </span>
        <Calendar1 className="text-muted-foreground ml-2" />
      </Button>
      {isOpen && (
        <div className="absolute z-20 mt-20">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            onDayClick={handleCalendarClose}
            className="w-[260px] rounded-md border shadow-sm"
            captionLayout="dropdown"
          />
        </div>
      )}
    </div>
  );
}
