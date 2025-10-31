import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "@/lib/supabase";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import { Card, Separator } from "@/components/ui";
import { toast } from "sonner";
import { CaseSensitive } from "lucide-react";
import type { Topic } from "@/types/topic.type";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface Props {
  props: Topic;
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

function extractTextFromContent(content: string | any[], maxChars = 200) {
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    if (!Array.isArray(parsed)) {
      console.warn("content 데이터 타입이 배열이 아닙니다.");
      return "";
    }

    let result = "";

    for (const block of parsed) {
      if (Array.isArray(block.content)) {
        for (const child of block.content) {
          if (child?.text) {
            result += child.text + " ";

            if (result.length >= maxChars) {
              return result.slice(0, maxChars) + "...";
            }
          }
        }
      }
    }
    return result.trim();
  } catch (error) {
    console.log("콘텐츠 파싱 실패: ", error);
    return "";
  }
}

export function TopicCard({ props }: Props) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    async function fetchAuthEmail() {
      const nickname = await findUserById(props.author);
      setNickname(nickname || "알 수 없는 사용자");
    }
    fetchAuthEmail();
  }, []);

  return (
    <Card
      className="h-fit w-full cursor-pointer gap-4 p-4"
      onClick={() => navigate(`/topic/${props.id}/detail`)}
    >
      <div className="flex items-start gap-4">
        <img
          src={props.thumbnail}
          alt="thumbnail"
          className="aspect-square h-[140px] w-[140px] rounded-lg object-cover"
        />
        <div className="flex flex-1 flex-col items-start gap-4">
          {/* 썸네일과 제목 */}
          <h3 className="line-clamp-2 h-16 text-base font-semibold tracking-tight">
            <CaseSensitive size={16} className="text-muted-foreground" />
            <p>{props.title}</p>
          </h3>
          {/* 본문 */}
          <p className="text-muted-foreground line-clamp-3">
            {extractTextFromContent(props.content)}
          </p>
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
