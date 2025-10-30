import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import { Badge, Button } from "../ui";
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { TOPIC_STATUS, type Topic } from "@/types/topic.type";

interface Props {
  children: React.ReactNode;
}

export function DraftDialog({ children }: Props) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [drafts, setDrafts] = useState<any[]>([]);

  const fetchDrafts = async () => {
    try {
      // .is() 쿼리문은 null만 체크할 경우 사용
      // .eq() 쿼리문은 연속으로 사용하여 임시 저장된 토픽을 조회합니다.
      const { data: topics, error } = await supabase
        .from("topic")
        .select("*")
        .eq("author", user?.id)
        .eq("status", TOPIC_STATUS.TEMP);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (topics) setDrafts(topics);
    } catch (error) {}
  };

  useEffect(() => {
    if (user?.email) fetchDrafts();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>임시 저장된 토픽</DialogTitle>
          <DialogDescription>
            임시 저장된 토픽 목록입니다. 이어서 작성하거나 삭제할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <div className="flex items-center gap-2">
            <p>임시 저장</p>
            <p className="-mr-[6px] text-green-600">{drafts.length}</p>
            <p>건</p>
          </div>
          <Separator />
          {drafts.length > 0 ? (
            <div className="flex h-60 min-h-60 flex-col items-center justify-start gap-3 overflow-y-scroll">
              {drafts.map((draft: Topic, index: number) => {
                return (
                  <div
                    className="bg-card/50 flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-4 py-2"
                    onClick={() => navigate(`/topics/${draft.id}/create`)}
                  >
                    <div className="flex items-start gap-2">
                      <Badge className="text-foreground mt-[3px] aspect-square h-5 w-5 rounded-sm bg-[#E26F24] hover:bg-[#E26F24]">
                        {index + 1}
                      </Badge>
                      <div className="flex flex-col">
                        <p className="line-clamp-1">{draft.title}</p>
                        <p className="text-muted-foreground text-xs">
                          작성일:{" "}
                          {dayjs(draft.created_at).format("YYYY. MM. DD")}
                        </p>
                      </div>
                    </div>
                    <Badge variant={"outline"}>작성중</Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-60 items-center justify-center">
              <p className="text-muted-foreground/50">
                조회 가능한 정보가 없습니다.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
