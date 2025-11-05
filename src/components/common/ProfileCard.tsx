import { Badge, Card, Separator } from "@/components/ui";
import type { Profile } from "@/types/profile.type";
import dayjs from "dayjs";

interface ProfileCardProps {
  profile: Profile;
  onClick?: (profile: Profile) => void;
  className?: string;
}

/**
 * 프로필 정보를 표시하는 카드 컴포넌트
 * @param profile - 표시할 프로필 데이터
 * @param onClick - 카드 클릭 시 실행할 함수
 * @param className - 추가 CSS 클래스
 */

export function ProfileCard({
  profile,
  onClick,
  className = "",
}: ProfileCardProps) {
  const handleClick = () => {
    onClick?.(profile);
  };

  return (
    <Card
      className={`h-fit w-full gap-4 p-4 ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col items-start gap-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-base font-semibold">
                <p>{profile.nickname}</p>
              </h3>
              <p>{profile.job}</p>
            </div>
            <p>{dayjs(profile.created_at).fromNow()}</p>
          </div>
          <Separator />
          <p className="text-muted-foreground line-clamp-3 min-h-[3.8rem]">
            {profile.introduction}
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-none bg-green-300/20 text-sm text-green-500"
          >
            희망 포지션
          </Badge>
          <p className="text-muted-foreground">{profile.position}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-none bg-blue-300/20 text-sm text-blue-500"
          >
            경력
          </Badge>
          <p className="text-muted-foreground">{profile.experience}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-none bg-red-300/20 text-sm text-red-500"
          >
            지역
          </Badge>
          <p className="text-muted-foreground">{profile.region}</p>
        </div>
      </div>
    </Card>
  );
}
