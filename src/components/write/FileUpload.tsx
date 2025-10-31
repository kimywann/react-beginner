import { useRef } from "react";
import { Button, Input } from "@/components/ui";
import { Image } from "lucide-react";

interface Props {
  file: File | string | null;
  onChange: (file: File | string | null) => void;
}

export function FileUpload({ file, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 파일 변경 감지 및 상위 컴포넌트 전달
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] ?? null);

    // 동일 파일 선택이 불가능할 수 있으므로 event.target.value를 초기화
    event.target.value = "";
  };

  // 이미지 미리보기
  const handleRenderPreview = () => {
    if (typeof file === "string") {
      return (
        <img
          src={file}
          alt="@THUMBNAIL"
          className="aspect-video w-full rounded-lg border object-cover"
        />
      );
    } else if (file instanceof File) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="@THUMBNAIL"
          className="aspect-video w-full rounded-lg border object-cover"
        />
      );
    }

    // 썸네일이 설정되지 않은 경우에는 기본 이미지 아이콘
    return (
      <div className="flex items-center justify-center">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video h-full w-full border-1 shadow-xs hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <Image className="!h-6 !w-6" />
            <p className="text-sm font-normal text-gray-400">
              클릭해서 이미지 첨부해 주세요
            </p>
          </div>
        </Button>
      </div>
    );
  };

  return (
    <>
      {handleRenderPreview()}
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChangeFile}
        className="hidden"
      />
    </>
  );
}
