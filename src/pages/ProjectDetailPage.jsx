import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import "./PageLayout.css"; // 공통 레이아웃 css 추가

const API_BASE_URL = "/api";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("oss_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    navigate("/");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFile(selected ?? null);
  };

  const handleSubmit = async () => {
    // trim()으로 공백만 있는 경우도 체크
    if (!text.trim() && !file) {
      alert("텍스트를 입력하거나 파일을 업로드해주세요.");
      return;
    }

    const token = localStorage.getItem("oss_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    try {
      setIsLoading(true);

      // 디버깅: token 확인
      console.log("Token:", token);
      if (!token) {
        alert("토큰이 없습니다. 다시 로그인해주세요.");
        navigate("/");
        return;
      }

      const formData = new FormData();
      formData.append("token", token);
      
      // text가 빈 문자열이어도 명시적으로 추가
      if (text.trim()) {
        formData.append("text", text);
      }
      
      if (file) {
        formData.append("file", file);
      }

      // 디버깅: FormData 내용 확인
      console.log("=== FormData 내용 ===");
      console.log("token:", token);
      console.log("text:", text);
      console.log("file:", file);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("===================");

      const res = await fetch(
        `${API_BASE_URL}/projects/${id}/summarize`, 
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`요약 요청 실패: ${data.detail || res.statusText}`);
        console.error("Error details:", data);
        return;
      }

      const data = await res.json();

      const summaryText =
        typeof data === "string"
          ? data
          : data.summary || JSON.stringify(data, null, 2);

      navigate("/summary", {
        state: {
          summary: summaryText,
          projectId: id,
        },
      });
    } catch (err) {
      console.error(err);
      alert("요약 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">프로젝트 상세</div>
            <div className="page-subtitle">
              ID: {id} · 요약할 텍스트 또는 파일을 업로드하세요.
            </div>
          </div>
        </div>

        <div className="page-actions">
          <button className="btn btn-ghost" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="page-body">
        {/* 텍스트 입력 카드 */}
        <section className="card">
          <div className="card-title">텍스트 입력</div>
          <div className="card-subtitle">
            바로 붙여넣을 수 있는 문서라면 여기에 텍스트로 입력해도 된다.
          </div>

          <textarea
            style={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="여기에 요약할 텍스트를 입력하세요."
          />
        </section>

        {/* 파일 업로드 카드 */}
        <section className="card">
          <div className="card-title">파일 업로드 (PDF / TXT / DOCX)</div>
          <div className="card-subtitle">
            업로드한 파일은 요약 생성에만 사용된다.
          </div>

          <div style={styles.section}>
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
            />
            {file && (
              <div style={styles.fileInfo}>선택된 파일: {file.name}</div>
            )}
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "요약 중..." : "요약 요청하기"}
          </button>
        </section>
      </main>
    </div>
  );
}

const styles = {
  textarea: {
    width: "100%",
    minHeight: 160,
    marginTop: 12,
    padding: 10,
    boxSizing: "border-box",
    borderRadius: 8,
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
    resize: "vertical",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 12,
    marginBottom: 12,
  },

  fileInfo: {
    fontSize: 13,
    color: "#9ca3af",
  },
};