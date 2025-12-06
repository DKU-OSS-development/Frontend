import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

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

      const formData = new FormData();
      formData.append("token", token);
      
      if (text.trim()) {
        formData.append("text", text);
      }
      
      if (file) {
        formData.append("file", file);
      }

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
              요약할 텍스트 또는 파일을 업로드하세요
            </div>
          </div>
        </div>

        <div className="page-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="page-body">
        {/* 텍스트 입력 카드 */}
        <section className="card">
          <div className="card-title">📝 텍스트 입력</div>
          <div className="card-subtitle">
            바로 붙여넣을 수 있는 문서라면 여기에 텍스트로 입력하세요
          </div>

          <textarea
            style={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="여기에 요약할 텍스트를 입력하세요..."
          />
        </section>

        {/* 파일 업로드 카드 */}
        <section className="card">
          <div className="card-title">📎 파일 업로드</div>
          <div className="card-subtitle">
            PDF, TXT, DOCX 파일을 업로드하세요
          </div>

          <div style={styles.fileSection}>
            <label htmlFor="file-input" style={styles.fileLabel}>
              <span style={styles.fileLabelIcon}>📁</span>
              {file ? file.name : "파일 선택"}
            </label>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            {file && (
              <button
                onClick={() => setFile(null)}
                style={styles.clearButton}
              >
                ✕ 취소
              </button>
            )}
          </div>
             <div className="flex-center" style={{ marginTop: '30px' }}>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ marginTop: 16 }}
          >
            {isLoading ? "⏳ 요약 중..." : "✨ 요약 요청하기"}
          </button>
          </div>
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
    padding: 12,
    boxSizing: "border-box",
    borderRadius: 8,
    border: "1px solid #1f2937",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 1.6,
    resize: "vertical",
    fontFamily: "inherit",
  },

  fileSection: {
    display: "flex",
    gap: 8,
    marginTop: 12,
    alignItems: "center",
  },

  fileInput: {
    display: "none",
  },

  fileLabel: {
    flex: 1,
    padding: "10px 16px",
    border: "2px dashed #374151",
    borderRadius: 8,
    cursor: "pointer",
    textAlign: "center",
    fontSize: 14,
    color: "#9ca3af",
    background: "#020617",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  fileLabelIcon: {
    fontSize: 18,
  },

  clearButton: {
    padding: "8px 16px",
    border: "1px solid #374151",
    borderRadius: 8,
    background: "#1f2937",
    color: "#ef4444",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};