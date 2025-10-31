import { Asterisk } from "lucide-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Separator,
  Textarea,
} from "../ui";
import {
  SelectExperience,
  SelectJob,
  SelectPositionRole,
  SelectRegion,
} from "./select";

export function ProfileForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">프로필 등록</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>프로필 등록</DialogTitle>
            <DialogDescription>
              프로필 등록하게 되면 팀빌딩 제안을 받을 수 있어요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">닉네임</Label>
              <Input id="name-1" name="name" />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-1">
                <Asterisk size={12} className="text-blue-500" />
                <Label htmlFor="username-1">현재 직무</Label>
              </div>
              <SelectJob />
            </div>

            <Separator />

            <div className="flex gap-3">
              <div className="grid gap-3">
                <div className="flex items-center gap-1">
                  <Asterisk size={12} className="text-blue-500" />
                  <Label htmlFor="username-1">희망 포지션</Label>
                </div>
                <SelectPositionRole />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-1">
                  <Asterisk size={12} className="text-blue-500" />
                  <Label htmlFor="username-1">관련 경력</Label>
                </div>
                <SelectExperience />
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-1">
                <Asterisk size={12} className="text-blue-500" />
                <Label htmlFor="username-1">지역</Label>
              </div>
              <SelectRegion />
            </div>

            <Separator />

            <div className="grid gap-3">
              <div className="flex items-center gap-1">
                <Asterisk size={12} className="text-blue-500" />
                <Label htmlFor="username-1">자기소개</Label>
              </div>
              <Textarea
                id="introduction"
                name="username"
                placeholder="한 줄로 자기소개 해주세요."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">닫기</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-500 text-white">
              등록하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
