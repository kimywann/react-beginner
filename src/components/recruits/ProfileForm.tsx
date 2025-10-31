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
import supabase from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [job, setJob] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");
  const [externalUrl, setExternalUrl] = useState<string | null>(null);

  const handleProfileSubmit = async () => {
    if (!job && !position && !experience && !region && !introduction) {
      toast.warning("직무, 포지션, 경력, 지역, 소개는 필수값입니다.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profile")
        .insert([
          {
            author: user?.id,
            nickname: user?.email?.split("@")[0],
            job: job,
            position: position,
            experience: experience,
            region: region,
            introduction: introduction,
            external_url: externalUrl || null,
          },
        ])
        .select();

      console.log(data);

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("프로필 등록이 완료되었습니다.");
        navigate("/recruits");
        return;
      }
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">프로필 등록</Button>
        </DialogTrigger>
        <DialogContent className="h-[650px] overflow-y-auto sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>프로필 등록</DialogTitle>
            <DialogDescription>
              프로필 등록하게 되면 팀빌딩 제안을 받을 수 있어요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">닉네임</Label>
              <Input
                id="name-1"
                name="nickname"
                defaultValue={user?.email?.split("@")[0]}
                disabled
              />
            </div>

            <Separator />

            <div className="flex justify-between gap-3">
              <div className="grid gap-3">
                <div className="flex items-center gap-1">
                  <Asterisk size={12} className="text-blue-500" />
                  <Label htmlFor="username-1">현재 직무</Label>
                </div>
                <SelectJob value={job} onValueChange={setJob} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-1">
                  <Asterisk size={12} className="text-blue-500" />
                  <Label htmlFor="username-1">희망 포지션</Label>
                </div>
                <SelectPositionRole
                  value={position}
                  onValueChange={setPosition}
                />
              </div>
            </div>

            <div className="flex justify-between gap-3">
              <div className="grid gap-3">
                <div className="flex items-center gap-1">
                  <Asterisk size={12} className="text-blue-500" />
                  <Label htmlFor="username-1">관련 경력</Label>
                </div>
                <SelectExperience
                  value={experience}
                  onValueChange={setExperience}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-1">
                  <Asterisk size={12} className="text-blue-500" />
                  <Label htmlFor="username-1">지역</Label>
                </div>
                <SelectRegion value={region} onValueChange={setRegion} />
              </div>
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
                placeholder="간단히 역량 어필해 주세요."
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">링크</Label>
              <Input
                id="external_url"
                name="external_url"
                placeholder="https://example.com"
                onChange={(e) => setExternalUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">닫기</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-500 text-white"
              onClick={handleProfileSubmit}
            >
              등록하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
