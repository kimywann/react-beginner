import {
  List,
  MonitorUp,
  Server,
  Router,
  Footprints,
  Goal,
  CircleEllipsis,
} from "lucide-react";

export const SIDEBAR_CATEGORY = [
  {
    id: 1,
    lable: "전체",
    category: "",
    icon: <List />,
  },
  {
    id: 2,
    lable: "프론트엔드",
    category: "front-end",
    icon: <MonitorUp />,
  },
  {
    id: 3,
    lable: "백엔드",
    category: "back-end",
    icon: <Server />,
  },
  {
    id: 4,
    lable: "인프라",
    category: "infrastructure",
    icon: <Router />,
  },
  {
    id: 5,
    lable: "자기계발",
    category: "self-development",
    icon: <Footprints />,
  },
  {
    id: 6,
    lable: "취업",
    category: "job",
    icon: <Goal />,
  },
  {
    id: 7,
    lable: "기타",
    category: "etc",
    icon: <CircleEllipsis />,
  },
];

export const TOPIC_CATEGORY = [
  {
    id: 1,
    lable: "프론트엔드",
    category: "front-end",
  },
  {
    id: 2,
    lable: "백엔드",
    category: "back-end",
  },
  {
    id: 3,
    lable: "인프라",
    category: "infrastructure",
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
    lable: "기타",
    category: "etc",
  },
];
