import { List, Users, BookOpenText } from "lucide-react";

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
];

export const POST_CATEGORY = [
  {
    id: 1,
    lable: "팀 프로젝트",
    category: "프로젝트",
  },
  {
    id: 2,
    lable: "스터디",
    category: "스터디",
  },
];

export const CATEGORY_META = [
  {
    id: 1,
    category: "",
    title: "전체 보기",
    description: "모든 주제의 글을 모아볼 수 있어요. ",
  },
  {
    id: 2,
    category: "team-project",
    title: "팀 프로젝트 모집",
    description:
      "함께 성장할 동료를 찾고 계신가요? 열정적인 동료들과 함께 프로젝트를 시작해보세요.",
  },
  {
    id: 3,
    category: "study",
    title: "스터디 모집",
    description:
      "함께 배우고 성장할 스터디를 찾아보세요. 지식을 나누며 함께 발전해나가요.",
  },
];
