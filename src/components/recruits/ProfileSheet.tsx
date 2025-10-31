import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Profile } from "@/types/profile.type";
import { Badge, Separator } from "../ui";

interface ProfileSheetProps {
  profile: Profile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSheet({
  profile,
  open,
  onOpenChange,
}: ProfileSheetProps) {
  if (!profile) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl">프로필</SheetTitle>
          <SheetDescription>
            목표를 향해 나아가는 여정에서, 새로운 사람들과의 만남을 통해 더 큰
            성장을 이룰 수 있습니다.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{profile.nickname}</p>
            <p className="text-muted-foreground">{profile.job}</p>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-none bg-green-400/20 text-sm text-green-500"
              >
                희망 포지션
              </Badge>
              <p className="text-muted-foreground">{profile.position}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-none bg-blue-400/20 text-sm text-blue-500"
              >
                경력
              </Badge>
              <p className="text-muted-foreground">{profile.experience}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-none bg-red-400/20 text-sm text-red-500"
              >
                지역
              </Badge>
              <p className="text-muted-foreground">{profile.region}</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-3">
            <h4 className="text-lg font-semibold">링크</h4>
            {profile.external_url ? (
              <a
                href={profile.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-lg break-all hover:underline"
              >
                {profile.external_url}
              </a>
            ) : (
              <p className="text-muted-foreground text-lg">
                기입하지 않았습니다.
              </p>
            )}
          </div>

          <Separator />

          <div className="grid gap-3">
            <h4 className="text-lg font-semibold">자기소개</h4>
            <p className="text-muted-foreground mb-8 text-lg break-all">
              {profile.introduction}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
