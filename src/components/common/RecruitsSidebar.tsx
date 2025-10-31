import { Asterisk } from "lucide-react";
import { SelectJob } from "./select";
import { SelectExperience } from "./select";
import { SelectRegion } from "./select";
import { Label } from "../ui";

function RecruitsSidebar() {
  return (
    <aside className="flex w-60 min-w-60 flex-col gap-6">
      <div className="flex w-full flex-col gap-6">
        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label htmlFor="username-1">현재 직무</Label>
          </div>
          <SelectJob />
        </section>

        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label htmlFor="username-1">관련 경력</Label>
          </div>
          <SelectExperience />
        </section>

        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={12} className="text-blue-500" />
            <Label htmlFor="username-1">지역</Label>
          </div>
          <SelectRegion />
        </section>
      </div>
    </aside>
  );
}

export { RecruitsSidebar };
