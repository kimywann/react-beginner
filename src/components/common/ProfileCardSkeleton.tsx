import { Skeleton } from "@/components/ui";

function ProfileCardSkeleton() {
  return (
    <div className="bg-card h-fit w-full gap-4 rounded-xl border p-4">
      {/* 상단 영역 - 닉네임, 직업, 시간 */}
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col items-start gap-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col items-start gap-1">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>

          {/* 구분선 */}
          <div className="bg-border h-px w-full" />

          {/* 소개글 영역 */}
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="bg-border my-4 h-px w-full" />

      {/* 하단 정보 영역 */}
      <div className="flex w-full flex-col gap-2">
        {/* 희망 포지션 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* 경력 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-5 w-14" />
        </div>

        {/* 지역 */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
}

export { ProfileCardSkeleton };
