# 🌊 SeaTea

> 9th UMC Web
> 
> **현대인을 위한 맞춤형 휴식 공간 추천 서비스**  
> Tea Tasting Note에서 영감을 받아, 지금의 나에게 꼭 맞는 휴식을 추천합니다.

## 📌 Project Overview

**SeaTea**는 차(Tea)의 **테이스팅 노트** 개념을 확장하여  
사용자의 감정·상태를 **8가지 휴식 유형**으로 분류하고,  
이에 어울리는 **공간과 경험을 추천**하는 서비스입니다.


## 👥 Contributors

| Contributor | Role | Description |
| :---: | :---: | :--- |
| <a href="https://github.com/cchaeyoon"><img src="https://avatars.githubusercontent.com/cchaeyoon?v=4" width="100px;" alt=""/><br /><sub><b>이채윤</b></sub><br /><sub>@cchaeyoon</sub></a> | **Lead**<br>Web | • **Architecture**: React 프로젝트 기본 세팅 및 라우팅 구조 구축<br>• **Core Module**: Axios Interceptor 및 공통 인증/인가 로직 구현<br>• **Feature**: 홈 화면, 지도(공간 조회·검색·상세) 페이지, 사이드바·404·로딩 페이지 담당 |
| <a href="https://github.com/Hyobee02"><img src="https://avatars.githubusercontent.com/Hyobee02?v=4" width="100px;" alt=""/><br /><sub><b>최효비</b></sub><br /><sub>@Hyobee02</sub></a> | Web | • **Design System**: Figma 기반 디자인 토큰 정의 및 글로벌 스타일 시스템 구축<br>• **Feature**: 진단(간단·상세) 페이지, 진단 결과 페이지 담당<br>• **Infra**: 프로젝트 배포 및 운영 환경 설정 |
| <a href="https://github.com/jimiiiy"><img src="https://avatars.githubusercontent.com/jimiiiy?v=4" width="100px;" alt=""/><br /><sub><b>이지민</b></sub><br /><sub>@jimiiiy</sub></a> | Web | • **Feature**: 로그인(일반/소셜) 및 회원가입 페이지, 마이페이지(프로필 수정) 및 마이 티백(북마크) 페이지 담당<br>• **Docs**: README 작성 |

---

## ✨ Key Features

### 🔐 인증 
- **소셜 로그인**: 카카오 소셜 로그인을 통한 회원가입/로그인 지원
- **일반 로그인**: 이메일 기반의 자체 회원가입 및 로그인 지원
- **프로필 설정**: 회원가입 시 닉네임 설정 및 프로필 이미지 설정 기능

### 📝 테이스팅 노트 진단
- **진단 온보딩**: 서비스 소개 및 사용자 선택에 따른 진단 모드(상세/간단) 선택
- **상세 진단**: 상세 질문을 통한 진단 기능. 점수 차 결과에 따라 정확한 진단을 위해 추가 질문 기능
- **간단 진단**: 20개의 키워드 중 3개를 선택하여 빠르게 진단
- **진단 결과**: 진단 결과에 따른 테이스팅 노트 설명 및 맞춤형 공간 큐레이션 제공
- **새로 진단하기**: 새롭게 유형 진단
- **과거 진단 내역**: 과거 진단 내역 제공

### 🗺️ 공간 추천 및 탐색 
- **테이스팅 노트 별 공간 추천**: 테이스팅 노트에 맞춰 필터링된 공간 목록 제공
- **공간 지도**: 카카오맵 API 연동, 위치 선택에 따른 지도 뷰 제공, 테이스팅 노트에 따른 공간 위치 마커로 표시
- **공간 검색**: 지도 내 키워드를 통한 공간 검색
- **공간 상세**: 해당 공간 상세 정보 제공, 공유하기 기능, 마이 티백 저장 기능

### 👤 마이페이지
- **유저 프로필카드**: 이메일, 현재 테이스팅 노트, 저장한 공간 수 표시
- **프로필 관리**: 닉네임 수정 및 프로필 이미지 변경 기능
- **마이 티백**: 내가 저장한 공간을 리스트 형태로 표시, 정렬 및 편집을 통한 취소 기능

---

## 🛠 Tech Stack

### Frontend
| Package | Version | Description |
| :--- | :--- | :--- |
| **React** | `v19.2.0` | UI 라이브러리 |
| **TypeScript** | `v5.9.3` | 정적 타입 언어 |
| **Vite** | `v7.2.4` | 빌드 툴 & 개발 서버 |
| **React Router** | `v7.11.0` | 페이지 라우팅 |
| **TanStack Query** | `v5.90.20` | 서버 상태 관리 & 데이터 패칭 |
| **Axios** | `v1.13.4` | HTTP 클라이언트 |
| **Tailwind CSS** | `v4.1.18` | 유틸리티 퍼스트 CSS 프레임워크 |
| **React Icons** | `v5.5.0` | 아이콘 라이브러리 |
| **CLSX** | `v2.1.1` | 조건부 클래스 병합 유틸리티 |
| **Zustand** | `v5.0.11` | 글로벌 클라이언트 상태 관리 라이브러리 |

### Development Tools
| Package | Version | Description |
| :--- | :--- | :--- |
| **ESLint** | `v9.39.2` | 코드 린팅 도구 |
| **Prettier** | `v3.8.1` | 코드 포맷터 |
| **Vite Plugin SVGR** | `v4.5.0` | SVG 컴포넌트 변환 도구 |

---
## 📂 Project Structure
```text
FE/
├── public/
├── src/
│   ├── apis/                   # API 통신 모듈
│   │   ├── auth/               # 인증 관련 API (로그인, 회원가입)
│   │   ├── diagnosis/          # 테이스팅 노트 진단 API
│   │   ├── spaces/             # 공간(지도) 및 검색 API
│   │   ├── teabag/             # 마이 티백 API
│   │   ├── axios.ts            # Axios 인스턴스 및 인터셉터 설정
│   │   └── member.ts           # 사용자 정보 관련 API
│   ├── assets/                 # 리소스 (아이콘, 이미지)
│   ├── components/             # 재사용 가능한 UI 컴포넌트
│   │   ├── Button/             # 공통 버튼 컴포넌트
│   │   ├── common/             # 기타 공통 컴포넌트
│   │   ├── Diagnosis/          # 진단 컴포넌트
│   │   ├── Feedback/           # 피드백 UI 컴포넌트
│   │   ├── LoadingSpinner/     # 로딩스피너
│   │   ├── MyPage/             # 프로필 카드 및 설정 컴포넌트
│   │   ├── PlaceTest/          # 공간 테스트 관련 컴포넌트
│   │   ├── Search/             # 검색 결과 리스트 컴포넌트
│   │   ├── SearchBar/          # 검색 입력바 컴포넌트
│   │   ├── SideBar/            # 사이드바
│   │   ├── SignUp/             # 회원가입 폼 컴포넌트
│   │   └── Toast/              # 토스트 메시지 컴포넌트
│   ├── constants/              # 상수 데이터
│   ├── hooks/                  # 커스텀 훅
│   ├── layouts/                # 레이아웃
│   ├── lib/                    # 라이브러리 설정
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Diagnosis/          # 진단
│   │   ├── Login/              # 로그인
│   │   ├── Map/                # 지도 및 공간 탐색
│   │   ├── MyPage/             # 마이페이지
│   │   ├── MyTasting/          # 마이 테이스팅 노트
│   │   ├── ErrorPage.tsx       # 404 및 에러 처리 페이지
│   │   ├── HomePage.tsx        # 메인 홈 페이지
│   │   ├── MyTeabagPage.tsx    # 마이 티백 (저장한 공간) 페이지
│   │   ├── OAuthCallbackPage.tsx # 카카오 소셜 로그인 리다이렉트 처리 페이지
│   │   ├── SignUpPage.tsx      # 회원가입 및 초기 프로필 설정 페이지
│   │   └── SpaceRecommendPage.tsx # 맞춤 공간 추천 페이지
│   ├── routes/                 # 라우팅 설정
│   │   ├── ProtectedRoutes.tsx 
│   │   ├── PublicRoutes.tsx    
│   │   └── index.ts          
│   ├── styles/                 # 스타일
│   ├── types/                  # 타입 정의
│   ├── utils/                  # 유틸리티 함수
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📱 Key Pages

### 🔐 Authentication (인증)
| 페이지 | 경로 (Path) | 설명 |
| :--- | :--- | :--- |
| **로그인 및 회원가입 온보딩** | `/login/start` | 로그인/회원가입 진입 및 소셜 로그인(새로운 유저 대상) |
| **로그인** | `/login` | 이메일 계정 로그인 및 소셜 로그인(기존 유저 대상) |
| **회원가입** | `/signup` | 이메일 기반 자체 회원가입, 닉네임 및 프로필 설정  |


### 📝 Diagnosis (테이스팅 노트 진단)
| 페이지 | 경로 (Path) | 설명 |
| :--- | :--- | :--- |
| **진단 온보딩** | `/diagnosis` | 서비스 소개 및 진단 모드(상세/간단) 선택 |
| **상세 진단** | `/diagnosis/detail` | 상세 질문을 통한 정밀 진단 진행 |
| **간단 진단** | `/diagnosis/simple` | 키워드 선택을 통한 간단 진단 진행 |
| **진단 결과** | `/diagnosis/complete` | 테이스팅 노트 결과 및 설명 제공 |
| **맞춤 추천** | `/diagnosis/recommend` | 결과에 따른 맞춤형 공간 큐레이션 제공 |
| **마이 테이스팅** | `/mytasting` | 현재 테이스팅 노트 및 과거 진단 이력 조회 |


### 🗺️ Map (공간 탐색)
| 페이지 | 경로 (Path) | 설명 |
| :--- | :--- | :--- |
| **공간 지도** | `/map` | 위치 선택에 따른 공간 탐색 및 테이스팅 노트별 필터링 |
| **공간 검색** | `/map/search` | 키워드를 통한 공간 검색 |
| **공간 상세** | `/map/:sid` | 개별 공간의 상세 정보 조회 및 마이티백 저장 |


### 👤 My Page (마이페이지)
| 페이지 | 경로 (Path) | 설명 |
| :--- | :--- | :--- |
| **마이페이지** | `/mypage` | 유저 프로필 카드 및 설정 관리 |
| **프로필 수정** | `/mypage/profile-edit` | 닉네임 변경 및 프로필 이미지 수정 |
| **마이 티백** | `/myteabag` | 내가 저장한 공간 모아보기 |


---

## 📌 Commit Convention
### Format
`#이슈번호 [타입] 작업명`
### Type List

- **[FEAT]** : 새로운 기능 구현
- **[MOD]** : 코드 수정 및 내부 파일 수정
- **[ADD]** : 라이브러리 추가, 신규 파일 생성
- **[CHORE]** : 설정 변경, 타입/변수명 수정 등 사소한 작업
- **[DEL]** : 불필요한 코드/파일 삭제
- **[UI]** : UI 작업
- **[FIX]** : 버그 및 오류 해결
- **[MOVE]** : 파일 또는 코드 이동
- **[RENAME]** : 파일명 변경
- **[REFACTOR]** : 리팩토링
- **[DOCS]** : README, WIKI 등 문서 수정

## 🌿 Git Flow Strategy

### Branch Types

- **`main`**  
  → 배포 가능한 최종 코드 브랜치

- **`develop`**  
  → 개발 중인 기능이 통합되는 브랜치

- **`feature`**  
  → 기능 단위 작업 브랜치

- **`hotfix`**  
  → 긴급 오류 수정 브랜치

## 🔄 Workflow

1. **Issue 생성**  
   - 작업 내용에 대한 Issue를 생성합니다.

2. **Branch 생성**  
   - Issue를 기준으로 `feature` 또는 `hotfix` 브랜치를 생성합니다.

3. **기능 구현**  
   - 기능 단위로 커밋을 나누어 진행합니다.
   - 기능 구현 중 설치한 라이브러리는 **Discord 스레드에 공유**합니다.

4. **Pull Request 생성**  
   - PR을 생성하기 전 `npm run build`로 빌드 오류 여부를 확인합니다.
   - 빌드가 정상적으로 완료되면 PR을 생성합니다.

5. **Code Review**  
   - PR 작성자 외 팀원들이 리뷰를 진행합니다.
   - 필수 리뷰어: 2명

6. **리뷰 반영**  
   - 수정 요청을 반영 후 다시 push 합니다.

7. **Merge**
   - 리뷰어의 Approve 2개를 받은 후 merge를 진행합니다.

8. **Pull**  
   - merge 완료 후 `develop` 브랜치로 이동하여  
     `git pull develop`으로 최신 상태를 유지합니다.
   - 이후 `npm install`을 실행하여 최신 라이브러리를 설치합니다.

9. **브랜치 정리**
    - merge가 완료된 브랜치는 생성자가 삭제합니다.
