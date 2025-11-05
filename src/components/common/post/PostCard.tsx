import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "@/lib/supabase";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import { Badge, Card, Separator } from "@/components/ui";
import { toast } from "sonner";
import type { POST } from "@/types/post.type";
import { FolderGit2 } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface Props {
  props: POST;
}

async function findUserById(id: string) {
  try {
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (user && user.length > 0) {
      return user[0].email.split("@")[0] + "님";
    } else {
      return "알 수 없는 사용자";
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// function extractTextFromContent(content: string | any[], maxChars = 200) {
//   try {
//     const parsed = typeof content === "string" ? JSON.parse(content) : content;
//
//     if (!Array.isArray(parsed)) {
//       console.warn("content 데이터 타입이 배열이 아닙니다.");
//       return "";
//     }
//
//     let result = "";
//
//     for (const block of parsed) {
//       if (Array.isArray(block.content)) {
//         for (const child of block.content) {
//           if (child?.text) {
//             result += child.text + " ";
//
//             if (result.length >= maxChars) {
//               return result.slice(0, maxChars) + "...";
//             }
//           }
//         }
//       }
//     }
//     return result.trim();
//   } catch (error) {
//     console.log("콘텐츠 파싱 실패: ", error);
//     return "";
//   }
// }

export function PostCard({ props }: Props) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    async function fetchAuthEmail() {
      const nickname = await findUserById(props.author);
      setNickname(nickname || "알 수 없는 사용자");
    }
    fetchAuthEmail();
  }, []);

  const categoryColors: Record<string, string> = {
    프로젝트: "bg-blue-400",
    스터디: "bg-emerald-500",
  };

  return (
    <Card
      className="h-fit w-full cursor-pointer gap-4 p-4"
      onClick={() => navigate(`/posts/${props.id}`)}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col items-start gap-4">
          <section className="flex items-center justify-between gap-2">
            <div>
              <Badge
                className={`${categoryColors[props.category]} !rounded-sm`}
              >
                <FolderGit2 />
                <p> {props.category}</p>
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                모집 마감일 |{" "}
                {dayjs(props.recruitment_deadline).format("YYYY.MM.DD")}
              </p>
            </div>
          </section>

          <section>
            <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold">
              <p>{props.title}</p>
            </h3>
          </section>

          <section className="flex w-full flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-200 text-gray-700">진행 방식</Badge>
              <p className="text-muted-foreground text-md">
                {props.progress_method}
              </p>
            </div>

            <div className="mt-1 flex items-center gap-2">
              <Badge className="bg-gray-200 text-gray-700">활동 기간</Badge>
              <p className="text-muted-foreground text-md">{props.duration}</p>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge className="bg-gray-200 text-gray-700">포지션</Badge>
              {(Array.isArray(props.position)
                ? props.position
                : JSON.parse(props.position as string)
              ).map((position: string) => (
                <Badge
                  key={position}
                  variant="outline"
                  className="bg-slate-50 text-sm font-bold text-slate-500"
                >
                  {position}
                </Badge>
              ))}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge className="bg-gray-200 text-gray-700">기술 스택</Badge>
              {(Array.isArray(props.tech_stack)
                ? props.tech_stack
                : JSON.parse(props.tech_stack as string)
              ).map((tech: string) => (
                <img
                  src={`/images/icons/tech/${tech.toLowerCase()}.svg`}
                  alt={tech}
                  className="size-7"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Separator />
      <div className="flex w-full items-center justify-between">
        <p>{nickname}</p>
        <p>{dayjs(props.created_at).fromNow()}</p>
      </div>
    </Card>
  );
}
