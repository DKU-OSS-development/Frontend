import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const API_BASE_URL = "/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  // 회원가입 처리
  const handleSignup = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
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

      alert("회원가입 성공! 로그인해주세요.");
      setIsSignupMode(false);
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 처리
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
        alert("로그인 실패: 아이디와 비밀번호를 확인해주세요.");
        return;
      }

      const data = await res.json();
      if (!data.token) {
        alert("토큰이 없습니다. 백엔드를 확인해주세요.");
        return;
      }

      localStorage.setItem("oss_token", data.token);
      if (email) localStorage.setItem("oss_email", email);

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

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
      {/* 왼쪽 브랜딩 섹션 */}
      <div className="login-left">
        <div className="brand-content">
          <div className="logo-container">
            <img 
              src="/src/assets/ClaudeLogo.png" 
              alt="Claude AI" 
              className="logo-image"
            />
            <img 
              src="/src/assets/kubeLogo.png" 
              alt="Kubernetes" 
              className="logo-image"
            />
          </div>
          
          <h1 className="brand-title">
            Claude AI 기반<br/>문서 요약 서비스
          </h1>
          
          <p className="brand-subtitle">
            인공지능 기술로 복잡한 문서를 빠르고 정확하게 요약합니다.
            클라우드 기반 인프라로 안정적인 서비스를 제공합니다.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">📄</div>
              <span>PDF, TXT, DOCX 파일 지원</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <span>Claude AI 실시간 요약</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📁</div>
              <span>프로젝트 단위 문서 관리</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">☁️</div>
              <span>Kubernetes 기반 안정적 운영</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 로그인/회원가입 폼 */}
      <div className="login-right">
        <div className="login-card">
          {/* 탭 전환 */}
          <div className="login-tabs">
            <button
              type="button"
              className={`tab-button ${!isSignupMode ? 'active' : ''}`}
              onClick={() => {
                setIsSignupMode(false);
                setPassword("");
              }}
            >
              로그인
            </button>
            <button
              type="button"
              className={`tab-button ${isSignupMode ? 'active' : ''}`}
              onClick={() => {
                setIsSignupMode(true);
                setPassword("");
              }}
            >
              회원가입
            </button>
          </div>

          {/* 폼 제목 */}
          <h2 className="login-title">
            {isSignupMode ? "계정 만들기" : "환영합니다"}
          </h2>
          <p className="login-description">
            {isSignupMode
              ? "새 계정을 만들어 문서 요약 서비스를 시작하세요"
              : "이메일과 비밀번호로 로그인하세요"}
          </p>

          {/* 로그인/회원가입 폼 */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label className="login-input-label">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <div className="login-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading
                  ? "처리 중..."
                  : isSignupMode
                  ? "회원가입"
                  : "로그인"}
              </button>
            </div>
          </form>

          {/* 하단 링크 */}
          <div className="login-footer">
            {isSignupMode ? (
              <>
                이미 계정이 있으신가요?{" "}
                <span
                  className="login-link"
                  onClick={() => {
                    setIsSignupMode(false);
                    setPassword("");
                  }}
                >
                  로그인하기
                </span>
              </>
            ) : (
              <>
                계정이 없으신가요?{" "}
                <span
                  className="login-link"
                  onClick={() => {
                    setIsSignupMode(true);
                    setPassword("");
                  }}
                >
                  회원가입하기
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}