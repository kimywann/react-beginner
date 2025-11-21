import supabase from "@/lib/supabase";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const usePostDelete = () => {
  const navigate = useNavigate();

  const handleDelete = useCallback(async (id: number) => {
    if (!id) {
      toast.error("게시글 ID를 찾을 수 없습니다.");
      return;
    }
    try {
      const { error } = await supabase.from("post").delete().eq("id", id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("글을 삭제하였습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);
  return { handleDelete };
};
