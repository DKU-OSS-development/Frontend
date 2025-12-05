import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 

const API_BASE_URL = "/api"; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ 모드 구분 상태 추가 (false: 로그인, true: 회원가입)
  const [isSignupMode, setIsSignupMode] = useState(false);

  // 회원가입 처리 함수
  const handleSignup = async () => {
    if (!email || !password) {
      alert("회원가입 하려는 이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`회원가입 실패: ${data.detail || data.message || res.status}`);
        return;
      }

      alert("회원가입 성공! 이제 로그인해주세요.");
      // 가입 성공 시 로그인 모드로 자동 전환
      setIsSignupMode(false);
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert(`로그인 실패: 아이디와 비밀번호를 확인해주세요.`);
        return;
      }

      const data = await res.json(); 
      if (!data.token) {
        alert("토큰이 없습니다. 백엔드를 확인해주세요.");
        return;
      }

      localStorage.setItem("oss_token", data.token);
      
      // ✅ 이메일 정보가 있다면 같이 저장 (홈 화면 표시용)
      if (email) localStorage.setItem("oss_email", email);

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 제출 핸들러 (모드에 따라 동작 분기)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignupMode) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* ✅ 제목이 모드에 따라 바뀜 */}
        <h1 className="login-title">
          {isSignupMode ? "회원가입" : "Claude AI 기반 문서요약 서비스"}
        </h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-input-label">이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-actions">
            {/* ✅ 메인 버튼: 모드에 따라 '로그인' 또는 '가입하기'로 변경 */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading 
                ? "처리 중..." 
                : (isSignupMode ? "가입하기" : "로그인")
              }
            </button>

            {/* ✅ 전환 버튼: 모드를 바꾸는 역할 */}
            <button
              type="button"
              className="btn btn-secondary"
              disabled={isLoading}
              onClick={() => {
                setIsSignupMode(!isSignupMode); // 모드 반전 (토글)
                setEmail("");    // 입력창 초기화 (선택사항)
                setPassword(""); 
              }}
            >
              {isSignupMode ? "로그인 화면으로 돌아가기" : "회원가입 하러 가기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}