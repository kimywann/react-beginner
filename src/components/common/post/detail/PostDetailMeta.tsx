import type { Post } from "@/types/post.type";
import { Badge } from "@/components/ui";

interface Props {
  post: Post;
}

export default function PostDetailMeta({ post }: Props) {
  return (
    <section className="mx-auto mt-10 flex w-[90%] max-w-2xl flex-col">
      <div className="rounded-xl border-1 p-6">
        <div className="grid grid-cols-2 gap-y-5 text-lg">
          {/* 모집 인원 */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 md:text-lg">
              모집 인원
            </span>
            <span className="text-sm font-bold md:text-lg">
              {post?.members}
            </span>
          </div>

          {/* 진행 방식 */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 md:text-lg">
              진행 방식
            </span>
            <span className="text-sm font-bold md:text-lg">
              {post?.progress_method}
            </span>
          </div>

          {/* 예상 기간 */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 md:text-lg">
              예상 기간
            </span>
            <span className="text-sm font-bold md:text-lg">
              {post?.duration}
            </span>
          </div>

          {/* 연락 수단 */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 md:text-lg">
              연락 수단
            </span>
            <Badge
              variant="outline"
              className="bg-slate-50 text-xs font-bold text-slate-500 md:text-base"
            >
              <a
                href={post?.contact_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {post?.contact}
              </a>
            </Badge>
          </div>
        </div>

        {/* 모집 분야 */}
        <div className="mt-5 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-500 md:text-lg">
              모집 분야
            </span>
            <div className="flex flex-wrap gap-2">
              {post?.position?.map((pos: string) => (
                <Badge
                  key={pos}
                  variant="outline"
                  className="bg-slate-50 text-xs font-bold text-slate-500 md:text-base"
                >
                  {pos}
                </Badge>
              ))}
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="flex flex-wrap items-center gap-5">
            <span className="text-sm font-semibold text-gray-500 md:text-lg">
              기술 스택
            </span>
            <div className="flex flex-wrap gap-2">
              {post?.tech_stack?.map((tech: string) => (
                <img
                  key={tech}
                  src={`/images/icons/tech/${tech.toLowerCase()}.svg`}
                  alt={tech}
                  className="size-5 md:size-7"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
