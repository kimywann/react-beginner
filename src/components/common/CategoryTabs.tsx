import { Button } from "../ui";
import { SIDEBAR_CATEGORY } from "../constants/category";

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

function CategoryTabs({ category, setCategory }: Props) {
  return (
    <aside className="flex w-full justify-center">
      <div className="flex gap-2">
        {SIDEBAR_CATEGORY.map((menu) => {
          return (
            <Button
              key={menu.id}
              variant={"ghost"}
              className={`text-muted-foreground h-25 w-40 ${category === menu.category && "text-foreground bg-accent/50"} `}
              onClick={() => setCategory(menu.category)}
            >
              <div className="flex flex-col items-center gap-2">
                <p>{menu.icon}</p>
                <p className="text-base">{menu.lable}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export { CategoryTabs };
