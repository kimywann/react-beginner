import supabase from "@/lib/supabase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { ProfileForm } from "@/components/recruits/ProfileForm";

import type { ProfileFormData } from "@/lib/profile.schema";
import { toast } from "sonner";

interface Props {
  disabled?: boolean;
  onSuccess?: () => void;
}

export function InsertDialog({ disabled, onSuccess }: Props) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleInsert = async (data: ProfileFormData) => {
    try {
      const { error } = await supabase.from("profile").insert([
        {
          author: user?.id,
          nickname: user?.email?.split("@")[0],
          contact_method: data.contactMethod,
          job: data.job,
          position: data.position,
          experience: data.experience,
          region: data.region,
          introduction: data.introduction,
          external_url: data.externalUrl || null,
        },
      ]);

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success("프로필 등록이 완료되었습니다.");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("등록 중 오류가 발생했습니다.");
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          onClick={() => {
            if (!user?.id) {
              navigate("/sign-in");
              return;
            }
          }}
        >
          프로필 등록
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[650px] overflow-y-auto sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>프로필 등록</DialogTitle>
          <DialogDescription>
            프로필을 등록하면 팀빌딩 제안을 받을 수 있어요.
          </DialogDescription>
        </DialogHeader>

        <ProfileForm
          onSubmit={handleInsert}
          onSuccess={() => setOpen(false)}
          buttonLabel="등록 완료"
        />
      </DialogContent>
    </Dialog>
  );
}
