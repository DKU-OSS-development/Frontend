# 🚀 Frontend × Backend API Integration (React + FastAPI) (수정예정)

React 프론트엔드와 FastAPI 백엔드를 연동하여  
**문서 업로드 → Claude 요약 → 요약 결과 렌더링**

---

### ✅ 1. 로그인 / 회원가입 (JWT 인증)

- 이메일 + 비밀번호 입력
- `/auth/signup` → 회원가입
- `/auth/login` → 로그인 + JWT 발급
- JWT는 `localStorage` 에 저장됨
- 로그인 성공 시 `/home` 으로 이동

---

### ✅ 2. 프로젝트 목록 / 생성 기능

- `/projects` 페이지에서 프로젝트 목록 조회
- “새 프로젝트 만들기”로 프로젝트 생성
- 프로젝트 클릭 시 `/projects/:id` 이동

---

### ✅ 3. 텍스트 입력 / 파일 업로드 (PDF / TXT / DOCX)

- React에서 파일 선택
- `FormData` 로 파일 전달
- 백엔드는 파일을 파싱하여 텍스트 추출
- Claude API로 요약 요청

---

### ✅ 4. Claude AI 요약 기능 연동

- 백엔드는 **Claude API Key** 로 텍스트를 요약
- 프론트는 `/loading` 페이지에서 대기 상태 유지
- 요약 완료 후 `/summary` 페이지로 이동하여 결과 렌더링

---

### ✅ 5. 로딩 페이지 (LoadingPage)

- 요약 요청 진행 중 사용자 대기 화면
- 로딩 애니메이션 + “요약 중…” 출력

---

### ✅ 6. 요약 결과 페이지 (SummaryPage)

- 백엔드에서 받은 요약 텍스트 렌더링
- 제공 기능:
  - 다시 요약하기
  - 홈으로 이동
  - 프로젝트 목록으로 이동
- `location.state` 로 요약 결과 전달

---
## 📌 요약 요청 흐름 상세

1. 사용자가 텍스트 입력 또는 파일 선택
2. 프론트에서 FormData 또는 JSON으로 서버로 전송
3. 백엔드는 텍스트 추출 후 Claude API 호출
4. 요약 결과를 DB에 저장
5. /summary 페이지로 이동하여 요약 결과 표시

---

## 🚀 설치방법 
---
- (명령프롬프트 or VSCode에서)

```
1. git clone --branch feature/front-back-api-connect --single-branch https://github.com/DKU-OSS-development/Frontend.git  
2. cd Frontend
3. npm install
4. npm run dev
```
- 또는 브랜치에서 .zip 파일로 다운로드 후 실행


## 🏁 실행 후 브라우저에서 확인:

프론트엔드: http://localhost:5173/

백엔드(API 서버): http://localhost:8000

⚠️ 프론트엔드는 백엔드 API를 호출하므로
반드시 백엔드 서버도 실행 중이어야 정상 동작.


## 🚩 설치 과정 화면
   <img width="1574" height="472" alt="image" src="https://github.com/user-attachments/assets/aec8087b-8de3-4623-8183-d4c9f4a02d57" />
   <img width="463" height="286" alt="image" src="https://github.com/user-attachments/assets/8fc8a5dd-8359-4e1b-982e-968d64e96ea5" />





