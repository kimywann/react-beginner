import { ProfileForm } from "@/components/common";
import { RecruitsSidebar } from "@/components/common/RecruitsSidebar";
import { Badge, Card, Separator } from "@/components/ui";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Profile } from "@/types/profile.type";

export default function Recruits() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const fetchProfiles = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profile")
        .select("*");

      if (error) {
        toast.error(error.message);
        return;
      }

      if (profiles) {
        setProfiles(profiles);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <main className="flex h-full min-h-[720px] w-full flex-col items-center gap-6 p-6">
      <div className="flex w-full flex-col">
        <h1 className="text-2xl font-bold"></h1>
      </div>

      <section className="flex w-full flex-col gap-12">
        <div className="flex w-full gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 rounded-md border p-4 shadow-xs">
              <div className="flex items-center gap-2">
                <ProfileForm />
              </div>
              <p className="text-muted-foreground">
                프로필을 등록하면,
                <br />
                협업 기회를 놓치지 않습니다.
              </p>
            </div>
            <RecruitsSidebar />
          </div>
          <div className="flex min-h-120 w-full flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile: Profile) => {
              return (
                <Card className="h-fit w-full cursor-pointer gap-4 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-1 flex-col items-start gap-4">
                      <div className="flex flex-col items-start gap-1">
                        {/* 썸네일과 제목 */}
                        <h3 className="text-base font-semibold">
                          <p>{profile.nickname}</p>
                        </h3>
                        <p>{profile.job}</p>
                      </div>
                      <Separator />
                      {/* 본문 */}
                      <p className="text-muted-foreground line-clamp-3">
                        {profile.introduction}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-none bg-green-300/20 text-green-500/70"
                      >
                        희망 포지션
                      </Badge>
                      <p className="text-muted-foreground">
                        {profile.position}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-none bg-blue-300/20 text-blue-500/70"
                      >
                        경력
                      </Badge>
                      <p className="text-muted-foreground">
                        {profile.experience}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-none bg-red-300/20 text-red-500/70"
                      >
                        지역
                      </Badge>
                      <p className="text-muted-foreground">{profile.region}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
