import { SIDEBAR_CATEGORY } from "../constants/category";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui";

function Sidebar() {
  return (
    <aside className="flex w-60 min-w-60 flex-col gap-6">
      <div className="itmes-center flex gap-2">
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
              className="text-muted-foreground transltion-all justify-start duration-400 hover:pl-6"
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
