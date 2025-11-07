import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import supabase from "@/lib/supabase";
import type { Profile } from "@/types/profile.type";
import { ProfileForm, type ProfileFormData } from "../ProfileForm";
import { useAuthStore } from "@/stores";
import { useState } from "react";
import { toast } from "sonner";
import { PencilLine } from "lucide-react";

interface Props {
  myProfile: Profile;
  onSuccess?: () => void;
  className?: string;
}

export function UpdateDialog({ myProfile, onSuccess, className }: Props) {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleUpdate = async (data: ProfileFormData) => {
    try {
      const { error } = await supabase
        .from("profile")
        .update({
          contact_method: data.contactMethod,
          job: data.job,
          position: data.position,
          experience: data.experience,
          region: data.region,
          introduction: data.introduction,
          external_url: data.externalUrl || null,
        })
        .eq("author", user?.id);

      if (error) {
        toast.error(error.message);
        throw error;
      }

      toast.success("프로필이 수정되었습니다.");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("수정 중 오류가 발생했습니다.");
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${className} bg-gray-200 text-gray-700 hover:bg-gray-600 hover:text-white`}
        >
          <PencilLine />
          수정
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[650px] overflow-y-auto sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>
            프로필 정보를 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <ProfileForm
          defaultValues={{
            contactMethod: myProfile.contact_method,
            job: myProfile.job,
            position: myProfile.position,
            experience: myProfile.experience,
            region: myProfile.region,
            introduction: myProfile.introduction,
            externalUrl: myProfile.external_url || "",
          }}
          buttonLabel="수정 완료"
          onSubmit={handleUpdate}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
