import supabase from "@/lib/supabase";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "@/components/ui";

import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email({
    error: "올바른 형식의 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(8, {
    error: "비밀번호는 최소 8자 이상이어야 합니다.",
  }),
});

export default function SignIn() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        // data는 2개의 객체 데이터를 전달한다.
        // 1. session
        // 2. user
        toast.success("로그인에 성공하였습니다!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  };

  return (
    <main className="flex h-full min-h-[720px] w-full items-center justify-center gap-6 p-6">
      <div className="flex w-100 max-w-100 flex-col gap-6 px-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                로그인
              </h4>
              <p className="text-muted-foreground">
                로그인을 위한 정보를 입력해 주세요.
              </p>
            </div>
            <div className="grid gap-3">
              <Button type="button" variant={"secondary"}>
                <img
                  src="/images/icons/social/google.svg"
                  alt="google-logo"
                  className="mr-1 h-[18px] w-[18px]"
                />
                구글 로그인
              </Button>
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background text-muted-foreground px-2 uppercase">
                  OR
                </span>
              </div>
            </div>
          </div>
          {/* 로그인 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-col gap-3">
                <Button
                  type="submit"
                  variant={"outline"}
                  className="flex-1 cursor-pointer !bg-blue-400 !text-white"
                >
                  로그인
                </Button>
                <div className="text-center">
                  계정이 없으신가요?
                  <NavLink to="/sign-up" className="ml-1 underline">
                    회원가입
                  </NavLink>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
