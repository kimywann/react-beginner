import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Profile } from "@/types/profile.type";
import { Badge, Label, Separator } from "../ui";

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
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4">
          <div className="flex justify-between">
            <section className="flex flex-col gap-5">
              <div>
                <p className="text-lg font-semibold md:text-2xl">
                  {profile.nickname}
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  {profile.job}
                </p>
              </div>
              <div>
                <Label className="text-sm font-semibold md:text-base">
                  연락 수단
                </Label>
                <p className="text-muted-foreground text-sm md:text-base">
                  {profile.contact_method}
                </p>
              </div>
            </section>

            <section>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-none bg-green-400/20 text-xs text-green-500 md:text-sm"
                  >
                    희망 포지션
                  </Badge>
                  <p className="text-muted-foreground">{profile.position}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-none bg-blue-400/20 text-xs text-blue-500 md:text-sm"
                  >
                    경력
                  </Badge>
                  <p className="text-muted-foreground">{profile.experience}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-none bg-red-400/20 text-xs text-red-500 md:text-sm"
                  >
                    지역
                  </Badge>
                  <p className="text-muted-foreground">{profile.region}</p>
                </div>
              </div>
            </section>
          </div>

          <Separator />

          <div className="grid gap-3">
            <h4 className="text-lg font-semibold">링크</h4>
            {profile.external_url ? (
              <a
                href={profile.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-base break-all hover:underline"
              >
                {profile.external_url}
              </a>
            ) : (
              <p className="text-muted-foreground text-sm md:text-base">
                기입하지 않았습니다.
              </p>
            )}
          </div>

          <Separator />

          <div className="grid gap-3">
            <h4 className="text-lg font-semibold">자기소개</h4>
            <p className="text-muted-foreground mb-8 text-sm break-all whitespace-pre-wrap md:text-base">
              {profile.introduction}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
