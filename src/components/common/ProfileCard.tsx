import { Card, Separator } from "@/components/ui";
import { InfoBadge } from "@/components/common/InfoBadge";

import type { Profile } from "@/types/profile.type";
import dayjs from "dayjs";

interface ProfileCardProps {
  profile: Profile;
  className?: string;
  onClick?: (profile: Profile) => void;
}

/**
 * 프로필 정보를 표시하는 카드 컴포넌트
 * @param profile - 표시할 프로필 데이터
 * @param className - 추가 CSS 클래스
 * @param onClick - 카드 클릭 시 실행할 함수
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
          <InfoBadge
            label="희망 포지션"
            value={profile.position}
            color="green"
          />
        </div>
        <div className="flex items-center gap-2">
          <InfoBadge label="경력" value={profile.experience} color="blue" />
        </div>
        <div className="flex items-center gap-2">
          <InfoBadge label="지역" value={profile.region} color="red" />
        </div>
      </div>
    </Card>
  );
}
