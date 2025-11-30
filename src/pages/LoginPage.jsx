import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "/api"; // 백엔드 주소 

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (err) {
      console.error(err);
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

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
        const data = await res.json().catch(() => ({}));
        alert(`로그인 실패`);
        return;
      }

      const data = await res.json(); // { token: "..." }
      if (!data.token) {
        alert("토큰이 없습니다. 백엔드를 확인해주세요.");
        return;
      }

      // JWT 토큰 저장
      localStorage.setItem("oss_token", data.token);
      // 홈으로 이동
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={{ marginBottom: 24 }}>Claude AI 기반 문서요약 서비스</h2> 

      <div style={styles.inputBox}>
        <input
          type="email"
          placeholder="이메일"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={styles.inputBox}>
        <input
          type="password"
          placeholder="비밀번호"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button style={styles.button} onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "처리 중..." : "로그인"}
      </button>
      <button
        style={styles.button}
        onClick={handleSignup}
        disabled={isLoading}
      >
        회원가입
      </button>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  inputBox: {
    width: 260,
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    boxSizing: "border-box",
  },
  button: {
  width: 260,
  padding: "12px 0",
  border: "1px solid #ccc",
  background: "#fff",
  color: "#000",    
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: "8px",
}
};