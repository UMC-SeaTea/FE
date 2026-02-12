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
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/cchaeyoon">
        <img src="https://avatars.githubusercontent.com/cchaeyoon?v=4" width="120px;" alt="profile"/>
        <br />
        <sub><b>이채윤</b></sub>
      </a>
      <br />
      <span>Lead · Web</span>
    </td>
    <td align="center">
      <a href="https://github.com/jimiiiy">
        <img src="https://avatars.githubusercontent.com/jimiiiy?v=4" width="120px;" alt="profile"/>
        <br />
        <sub><b>이지민</b></sub>
      </a>
      <br />
      <span>Web</span>
    </td>
    <td align="center">
      <a href="https://github.com/Hyobee02">
        <img src="https://avatars.githubusercontent.com/Hyobee02?v=4" width="120px;" alt="profile"/>
        <br />
        <sub><b>최효비</b></sub>
      </a>
      <br />
      <span>Web</span>
    </td>
  </tr>
</table>


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

### Development Tools
| Package | Version | Description |
| :--- | :--- | :--- |
| **ESLint** | `v9.39.2` | 코드 린팅 도구 |
| **Prettier** | `v3.8.1` | 코드 포맷터 |
| **Vite Plugin SVGR** | `v4.5.0` | SVG 컴포넌트 변환 도구 |

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
