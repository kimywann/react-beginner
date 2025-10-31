import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Profile } from "@/types/profile.type";

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>프로필</SheetTitle>
          <SheetDescription>
            목표를 향해 나아가는 여정에서, 새로운 사람들과의 만남을 통해 더 큰
            성장을 이룰 수 있습니다.프로필 정보를 수정해 주세요.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <p>{profile.nickname}</p>
            <p>{profile.job}</p>
          </div>
          <div className="grid gap-3">
            <p>{profile.position}</p>
            <p>{profile.experience}</p>
          </div>
          <div className="grid gap-3">
            <p>{profile.region}</p>
            <p>{profile.introduction}</p>
            <p>{profile.external_url}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
