import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { useEffect, useState, useMemo } from "react";

import { ProfileSheet, RecruitsSidebar } from "@/components/recruits";
import { InsertDialog } from "@/components/recruits/profile/InsertDialog";
import { UpdateDialog } from "@/components/recruits/profile/UpdateDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  Separator,
} from "@/components/ui";
import type { Profile } from "@/types/profile.type";

import { toast } from "sonner";
import dayjs from "dayjs";

export default function Recruits() {
  const user = useAuthStore((state) => state.user);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [filters, setFilters] = useState<{
    position?: string;
    job?: string;
    experience?: string;
    region?: string;
  }>({});

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // position 필터
      if (filters.position && profile.position !== filters.position) {
        return false;
      }

      // job 필터
      if (filters.job && profile.job !== filters.job) {
        return false;
      }

      // experience 필터
      if (filters.experience && profile.experience !== filters.experience) {
        return false;
      }

      // region 필터
      if (filters.region && profile.region !== filters.region) {
        return false;
      }

      return true;
    });
  }, [profiles, filters]);

  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

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

  const userProfile = profiles.find((profile) => profile.author === user?.id);

  const handleDeleteProfile = async () => {
    if (!userProfile) return;

    try {
      const { error } = await supabase
        .from("profile")
        .delete()
        .eq("author", user?.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("프로필이 삭제되었습니다.");
      fetchProfiles();
    } catch (error) {
      console.error(error);
      toast.error("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCardClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsSheetOpen(true);
  };

  return (
    <main className="flex h-full min-h-[720px] w-full flex-col items-center gap-6 p-6">
      <div className="flex w-full flex-col">
        <h1 className="text-2xl font-bold">동료 찾기</h1>
        <p className="text-muted-foreground text-base">
          프로필을 등록하고, 팀빌딩 제안을 받으세요.
        </p>
      </div>

      <section className="flex w-full flex-col gap-12">
        <div className="flex w-full gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 rounded-md border p-4 shadow-xs">
              <div className="flex items-center gap-24">
                <InsertDialog
                  disabled={!!userProfile}
                  onSuccess={fetchProfiles}
                />
              </div>
              <p className="text-muted-foreground">
                프로필을 등록하면,
                <br />
                팀빌딩 제안을 받을 수 있습니다.
              </p>
            </div>

            {userProfile && (
              <div className="flex items-center gap-2">
                <UpdateDialog
                  myProfile={userProfile}
                  onSuccess={fetchProfiles}
                />
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-24 !bg-red-400 text-white"
                    >
                      프로필 삭제
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        프로필을 삭제하시겠습니까?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>닫기</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-foreground bg-red-300 hover:bg-red-700/40"
                        onClick={handleDeleteProfile}
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
            <RecruitsSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          <div className="flex min-h-120 w-full flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.length === 0 ? (
              <div className="col-span-full flex min-h-[400px] w-full flex-col items-center justify-center gap-4 rounded-lg p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h3 className="text-muted-foreground text-xl font-semibold">
                    {Object.values(filters).some((v) => v)
                      ? "조건에 맞는 프로필이 없습니다"
                      : "등록된 프로필이 없습니다"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {Object.values(filters).some((v) => v)
                      ? "다른 조건으로 검색해보세요."
                      : "첫 번째로 프로필을 등록하고 팀빌딩 제안을 받아보세요."}
                  </p>
                </div>
              </div>
            ) : (
              // profiles 대신 filteredProfiles 사용
              filteredProfiles.map((profile: Profile) => {
                return (
                  <Card
                    key={profile.id}
                    className="h-fit w-full cursor-pointer gap-4 p-4"
                    onClick={() => handleCardClick(profile)}
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
                        <p className="text-muted-foreground">
                          {profile.position}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-none bg-blue-300/20 text-sm text-blue-500"
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
                          className="border-none bg-red-300/20 text-sm text-red-500"
                        >
                          지역
                        </Badge>
                        <p className="text-muted-foreground">
                          {profile.region}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      <ProfileSheet
        profile={selectedProfile}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </main>
  );
}
