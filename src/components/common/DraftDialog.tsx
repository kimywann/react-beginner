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

interface Props {
  children: React.ReactNode;
}

export function DraftDialog({ children }: Props) {
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
            <p className="-mr-[6px] text-green-600">10</p>
            <p>건</p>
          </div>
          <Separator />
          <div className="flex min-h-60 items-center justify-center">
            <p>조회 가능한 정보가 없습니다.</p>
          </div>
          <div className="flex min-h-60 flex-col items-center justify-center gap-3">
            <div className="flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-100 px-4 py-3">
              <div className="flex items-start gap-2">
                <Badge className="mt-[3px] h-5 w-5 !rounded-md bg-[#1976D2] text-white">
                  1
                </Badge>
                <div className="flex flex-col">
                  <p>등록된 제목이 없습니다.</p>
                  <p className="text-muted-foreground text-xs">
                    작성일: 2025. 09. 12.
                  </p>
                </div>
              </div>
              <Badge variant={"outline"}>작성중</Badge>
            </div>
          </div>
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
