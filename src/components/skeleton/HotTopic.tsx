import { Skeleton } from "../ui";

function SkeletonHotTopic() {
  return (
    <div className="flex w-full min-w-58 flex-col gap-2">
      <Skeleton className="h-70 w-full" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-[14px] w-20" />
        </div>
      </div>
    </div>
  );
}

export { SkeletonHotTopic };
