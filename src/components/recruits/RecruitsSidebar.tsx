import {
  SelectJob,
  SelectExperience,
  SelectRegion,
  SelectPositionRole,
} from "@/components/recruits/select";
import { Label, Separator } from "@/components/ui";
import { RotateCcw } from "lucide-react";

interface Props {
  filters: {
    position?: string;
    job?: string;
    experience?: string;
    region?: string;
  };
  onFilterChange: (key: string, value: string | undefined) => void;
  onResetFilters: () => void;
}

function RecruitsSidebar({ filters, onFilterChange, onResetFilters }: Props) {
  const hasActiveFilters = Object.values(filters).some((value) => value);

  return (
    <aside className="flex w-60 min-w-60 flex-col gap-6">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">필터</h3>
          {hasActiveFilters && (
            <RotateCcw size="sm" onClick={onResetFilters} className="h-4 w-4" />
          )}
        </div>
        <Separator />

        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="job-select">포지션</Label>
          </div>
          <SelectPositionRole
            value={filters.position}
            onValueChange={(value) => onFilterChange("position", value)}
          />
        </section>

        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="job-select">현재 직무</Label>
          </div>
          <SelectJob
            value={filters.job}
            onValueChange={(value) => onFilterChange("job", value)}
          />
        </section>

        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="experience-select">관련 경력</Label>
          </div>
          <SelectExperience
            value={filters.experience}
            onValueChange={(value) => onFilterChange("experience", value)}
          />
        </section>

        <section className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="region-select">지역</Label>
          </div>
          <SelectRegion
            value={filters.region}
            onValueChange={(value) => onFilterChange("region", value)}
          />
        </section>
      </div>
    </aside>
  );
}

export { RecruitsSidebar };
