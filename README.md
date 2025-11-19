# WeCode

**"팀 프로젝트와 스터디를 쉽게 찾고 참여할 수 있는 매칭 플랫폼"**

<img src="./src/assets/home.png" width="400px">

## 📋 프로젝트 소개

개발자, 디자이너, 기획자 등 다양한 직군에서 사용자가 팀을 모집하거나 팀빌딩 제안을 받을 수 있는 양방향 팀 매칭 플랫폼입니다. 모집 글 작성뿐 아니라 내 프로필 등록을 통해 제안을 주고받을 수 있어, 단방향 서비스와 달리 사용자가 능동적으로 팀 빌딩 과정에 참여하고, 자신에게 맞는 협업 기회를 발견할 수 있게 도와줍니다.

## ✨ 주요 기능

### 🏠 메인 페이지

- **최근 프로젝트/스터디 모집글 및 등록 프로필 조회**

### 📝 게시글 작성

- **게시글 작성**
  - 텍스트 에디터
  - 임시저장 기능
  - 상세 정보 입력
- **게시글 상세 조회**
- **게시글 수정**
- **게시글 삭제**

### 👥 동료 찾기 페이지

- **프로필 등록**
  - 직무, 포지션, 경력 정보
  - 활동 지역, 자기소개
  - 외부 링크
- **프로필 수정**
- **프로필 조회 및 필터링** : 원하는 조건의 동료 찾기

<br />

## 프로젝트 시연

### 모집 글 작성

<img src="./src/assets/preview1.gif" alt="프로젝트 시연" width="400" />

### 동료 찾기 페이지

<img src="./src/assets/preview2.gif" alt="프로젝트 시연" width="500" />

### 프로필 등록

<img src="./src/assets/preview3.gif" alt="프로젝트 시연" width="500" />

### 반응형

<img src="./src/assets/preview4.gif" alt="프로젝트 시연" width="500" />

## 프로젝트 구조

```
src/
├── api/ # API 호출 함수
├── assets/ # 이미지, GIF 등
├── components/ # 재사용 가능한 컴포넌트
│ ├── common/ # 공통 컴포넌트
│ ├── ui/ # Shadcn/ui 기반 UI 컴포넌트
│ └── constants/ # 상수 정의
├── pages/ # 페이지 컴포넌트
│ ├── auth/ # 인증 관련 페이지 (OAuth 콜백)
│ ├── find-teammates/ # 동료 찾기 페이지
│ ├── post/ # 게시글 관련 페이지 (작성, 상세, 수정)
│ ├── recruit/ # 팀원 모집 페이지
│ ├── sign-in/ # 로그인 페이지
│ └── sign-up/ # 회원가입 페이지
├── hooks/ # 커스텀 훅
├── lib/ # Supabase, TanStack Query 등 유틸리티
├── stores/ # Zustand 상태 관리
└── types/ # TypeScript 타입 정의
```

## 기술 스택

### Frontend

- **React**
- **TypeScript**
- **Vite**

### Styling & UI

- **Tailwind CSS**
- **Shadcn/ui**

### State Management & Forms

- **Zustand**
- **TanStack Query**
- **React Hook Form**
- **Zod**

### Testing

- **Vitest**
- **Cypress**

### Backend & Database

- **Supabase**

### Deployment

- **Vercel**

### Text Editor

- **BlockNote**
