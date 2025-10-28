import { Separator } from "../ui";

function Footer() {
  return (
    <footer className="itmes-center flex w-full justify-center bg-gray-50">
      <div className="flex w-full max-w-[1328px] flex-col gap-6 p-6 pb-18">
        <div className="mt-8 flex w-full items-start justify-between">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                토픽으로,
              </h3>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                세상을 이롭게 하다.
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <p>© Kimywann. All rights reserved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="cursor-pointer transition-all duration-300 hover:font-medium">
              Contact
            </p>
            <Separator orientation="vertical" className="!h-[14px]" />
            <p className="cursor-pointer transition-all duration-300 hover:font-medium">
              Github
            </p>
            <Separator orientation="vertical" className="!h-[14px]" />
            <p className="cursor-pointer transition-all duration-300 hover:font-medium">
              서비스 피드백
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
