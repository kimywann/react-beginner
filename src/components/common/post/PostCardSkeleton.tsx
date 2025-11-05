import { Skeleton } from "@/components/ui";

function PostCardSkeleton() {
  return (
    <div className="bg-card h-fit w-full gap-4 rounded-xl border p-4">
      {/* 상단 영역 - 프로젝트 구분, 모집 마감일 */}
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col items-start gap-4">
          <div className="flex w-full justify-between">
            <div className="flex gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-30" />
            </div>
          </div>

          {/* 제목 영역 */}
          <div className="mt-2 mb-2 w-full space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="flex w-full flex-col gap-2 space-y-1">
        {/* 진행 방식 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
        {/* 활동 기간 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* 포지션 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* 기술 스택 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="bg-border my-4 h-px w-full" />
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-start gap-1">
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

export { PostCardSkeleton };
