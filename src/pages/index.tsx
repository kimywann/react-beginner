import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { PostCard, PostCardSkeleton } from "@/components/common/post";
import { Button } from "@/components/ui";
import { ProfileCard } from "@/components/common/ProfileCard";

import { POST_STATUS, type POST } from "@/types/post.type";
import type { Profile } from "@/types/profile.type";

import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { ProfileSheet } from "@/components/recruits";
import { ProfileCardSkeleton } from "@/components/common/ProfileCardSkeleton";

function App() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<POST[]>([]);
  const [recentProfiles, setRecentProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsSheetOpen(true);
  };

  const fetchRecentData = async () => {
    try {
      setIsLoading(true);
      const { data: posts, error: postsError } = await supabase
        .from("post")
        .select("*")
        .eq("status", POST_STATUS.PUBLISH)
        .order("created_at", { ascending: false })
        .limit(4);

      const { data: profiles, error: profilesError } = await supabase
        .from("profile")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (postsError) {
        toast.error(postsError.message);
        return;
      }

      if (profilesError) {
        toast.error(profilesError.message);
        return;
      }

      if (posts) setRecentPosts(posts);
      if (profiles) setRecentProfiles(profiles);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentData();
  }, []);

  return (
    <main className="flex w-full flex-col items-center justify-center">
      {/* 홈 화면 */}
      <section className="flex w-full flex-col items-center justify-center bg-gradient-to-br to-indigo-50 px-6 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-4xl md:text-6xl">
            함께 만들어가는
            <br />
            <span className="text-blue-500">개발 여정</span>
          </h1>
          <p className="mx-auto mb-2 max-w-2xl text-sm text-gray-600 sm:text-base md:text-xl">
            프로젝트 팀원을 모집하고, 함께 할 동료를 찾아보세요.
            <br />
            당신의 아이디어를 현실로 만들어줄 팀을 찾을 수 있습니다.
          </p>
        </div>
      </section>

      {/* 최근 모집글 */}
      <section className="w-full px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
                최근 팀원 모집
              </h2>
              <p className="hidden text-gray-600 sm:block">
                지금 모집 중인 프로젝트를 확인해 보세요
              </p>
            </div>
            <div className="pb-3">
              <Button variant="outline" onClick={() => navigate("/recruit")}>
                전체 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {recentPosts.map((post: POST) => (
                <PostCard key={post.id} props={post} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">아직 등록된 모집 글이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* 최근 프로필 */}
      <section className="mb-14 w-full px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900 md:text-3xl">
                새로운 동료
              </h2>
              <p className="hidden text-gray-600 sm:block">
                최근 등록된 프로필을 확인해 보세요
              </p>
            </div>
            <div className="pb-3">
              <Button
                variant="outline"
                onClick={() => navigate("/find-teammates")}
                className="flex items-center gap-2"
              >
                전체 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProfileCardSkeleton key={index} />
              ))}
            </div>
          ) : recentProfiles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {recentProfiles.map((profile: Profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={handleProfileClick}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">아직 등록된 프로필이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* 프로필 상세 화면 */}
      <ProfileSheet
        profile={selectedProfile}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </main>
  );
}

export default App;
