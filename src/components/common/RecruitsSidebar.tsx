import { SelectJobRole } from "./select";
import { SelectExperience } from "./select";
import { SelectRegion } from "./select";

function RecruitsSidebar() {
  return (
    <aside className="flex w-60 min-w-60 flex-col gap-6">
      <div className="flex w-full flex-col gap-2">
        <SelectJobRole />
        <SelectExperience />
        <SelectRegion />
      </div>
    </aside>
  );
}

export { RecruitsSidebar };
