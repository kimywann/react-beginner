import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "@/lib/supabase";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import { Card, Label, Separator } from "@/components/ui";
import { toast } from "sonner";
import type { POST } from "@/types/post.type";

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

  return (
    <Card
      className="h-fit w-full cursor-pointer gap-4 p-4"
      onClick={() => navigate(`/posts/${props.id}`)}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-1 flex-col items-start gap-4">
          <h3 className="line-clamp-2 h-16 text-xl font-semibold">
            <p>{props.title}</p>
          </h3>

          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-lg">진행 방식:</Label>
              <p className="text-muted-foreground text-lg">
                {props.progress_method}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-lg">모집 인원:</Label>
              <p className="text-muted-foreground text-lg">{props.members}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-lg">연락 방법:</Label>
              <a
                href={props.contact_url}
                className="text-muted-foreground text-lg"
              >
                {props.contact}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-lg">모집 구분:</Label>
              <p className="text-muted-foreground text-lg">{props.duration}</p>
            </div>
          </div>
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
