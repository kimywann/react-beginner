import {
  List,
  Footprints,
  Goal,
  CircleEllipsis,
  Users,
  BookOpenText,
  MessageCircleQuestionIcon,
} from "lucide-react";

export const SIDEBAR_CATEGORY = [
  {
    id: 1,
    lable: "전체",
    category: "",
    icon: <List className="!h-6 !w-6" />,
  },
  {
    id: 2,
    lable: "팀 프로젝트",
    category: "team-project",
    icon: <Users className="!h-6 !w-6" />,
  },
  {
    id: 3,
    lable: "스터디",
    category: "study",
    icon: <BookOpenText className="!h-6 !w-6" />,
  },
  {
    id: 4,
    lable: "질문",
    category: "question",
    icon: <MessageCircleQuestionIcon className="!h-6 !w-6" />,
  },
  {
    id: 5,
    lable: "자기계발",
    category: "self-development",
    icon: <Footprints className="!h-6 !w-6" />,
  },
  {
    id: 6,
    lable: "취업",
    category: "job",
    icon: <Goal className="!h-6 !w-6" />,
  },
  {
    id: 7,
    lable: "자유",
    category: "etc",
    icon: <CircleEllipsis className="!h-6 !w-6" />,
  },
];

export const TOPIC_CATEGORY = [
  {
    id: 1,
    lable: "팀 프로젝트",
    category: "team-project",
  },
  {
    id: 2,
    lable: "스터디",
    category: "study",
  },
  {
    id: 3,
    lable: "질문",
    category: "question",
  },
  {
    id: 4,
    lable: "자기계발",
    category: "self-development",
  },
  {
    id: 5,
    lable: "취업",
    category: "job",
  },
  {
    id: 6,
    lable: "자유",
    category: "etc",
  },
];

export const CATEGORY_META = [
  {
    id: 1,
    category: "",
    title: "전체 보기",
    description:
      "모든 주제의 글을 모아볼 수 있어요. 지금 커뮤니티의 다양한 이야기를 확인해보세요.",
  },
  {
    id: 2,
    category: "team-project",
    title: "팀 프로젝트 모집",
    description:
      "함께 성장할 팀원을 찾고 계신가요? 열정적인 동료들과 함께 프로젝트를 시작해보세요.",
  },
  {
    id: 3,
    category: "study",
    title: "스터디 모집",
    description:
      "함께 배우고 성장할 스터디를 찾아보세요. 지식을 나누며 함께 발전해나가요.",
  },
  {
    id: 4,
    category: "question",
    title: "질문",
    description:
      "막히는 부분이 있나요? 커뮤니티에 질문하고 해결책을 찾아보세요.",
  },
  {
    id: 5,
    category: "self-development",
    title: "자기계발",
    description:
      "더 나은 개발자가 되기 위한 여정. 당신의 성장 스토리를 공유해보세요.",
  },
  {
    id: 6,
    category: "job",
    title: "취업 정보",
    description:
      "취업 준비부터 이직까지, 커리어 관련 정보와 경험을 나눠보세요.",
  },
  {
    id: 7,
    category: "etc",
    title: "자유 게시판",
    description: "자유로운 이야기를 나눠보세요. 모든 주제가 환영받습니다.",
  },
];
