import {
  SelectJob,
  SelectExperience,
  SelectRegion,
  SelectPositionRole,
} from "@/components/recruits/select";
import { Label } from "@/components/ui";
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
    <aside className="w-full">
      <div className="flex w-full snap-x snap-mandatory items-end gap-4 overflow-x-auto pb-2 lg:snap-none lg:overflow-visible lg:pb-0">
        <section className="flex min-w-[150px] snap-start flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="job-select">포지션</Label>
          </div>
          <SelectPositionRole
            value={filters.position}
            onValueChange={(value) => onFilterChange("position", value)}
            className="w-full"
          />
        </section>

        <section className="flex min-w-[150px] snap-start flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="job-select">현재 직무</Label>
          </div>
          <SelectJob
            value={filters.job}
            onValueChange={(value) => onFilterChange("job", value)}
            className="w-full"
          />
        </section>

        <section className="flex min-w-[150px] snap-start flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="experience-select">관련 경력</Label>
          </div>
          <SelectExperience
            value={filters.experience}
            onValueChange={(value) => onFilterChange("experience", value)}
            className="w-full"
          />
        </section>

        <section className="flex min-w-[150px] snap-start flex-col gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="region-select">지역</Label>
          </div>
          <SelectRegion
            value={filters.region}
            onValueChange={(value) => onFilterChange("region", value)}
            className="w-full"
          />
        </section>

        {hasActiveFilters && (
          <div className="flex min-w-[48px] snap-end justify-center">
            <button
              type="button"
              onClick={onResetFilters}
              className="border-input bg-background text-muted-foreground hover:text-foreground flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border transition"
              aria-label="필터 초기화"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export { RecruitsSidebar };
