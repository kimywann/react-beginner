import { ChevronDown } from "lucide-react";
import { Button } from "../ui";
import { SIDEBAR_CATEGORY } from "../constants/category";

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

function Sidebar({ category, setCategory }: Props) {
  return (
    <aside className="flex w-60 min-w-60 flex-col gap-6">
      <div className="flex items-center gap-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          카테고리
        </h4>
        <ChevronDown className="mt-1" />
      </div>
      <div className="flex w-full flex-col gap-2">
        {SIDEBAR_CATEGORY.map((menu) => {
          return (
            <Button
              key={menu.id}
              variant={"ghost"}
              className={`text-muted-foreground justify-start transition-all duration-500 hover:pl-6 hover:text-white ${category === menu.category && "text-foreground bg-accent/50 !pl-6"} `}
              onClick={() => setCategory(menu.category)}
            >
              {menu.icon}
              {menu.lable}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export { Sidebar };
