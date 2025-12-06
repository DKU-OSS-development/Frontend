import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

export default function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const summary = location.state?.summary || "요약 데이터가 없습니다.";
  const projectId = location.state?.projectId;

  const handleRetry = () => {
    if (projectId) navigate(`/projects/${projectId}`);
    else navigate(-1);
  };

  const handleGoHome = () => navigate("/home");
  const handleGoProjects = () => navigate("/projects");

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    navigate("/");
  };

  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">요약 결과</div>
            <div className="page-subtitle">
              생성된 요약을 확인하고 다시 요약하거나 다른 페이지로 이동할 수 있습니다
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
        <section className="card">
          <div style={styles.header}>
            <h2 style={styles.title}>✨ 요약 결과</h2>
          </div>

          <div style={styles.summaryBox}>
            <pre style={styles.summaryText}>{summary}</pre>
          </div>

          <div className="btn-group">
            <button className="btn btn-primary btn-md" onClick={handleRetry}>
              🔄 다시 요약하기
            </button>

            <button className="btn btn-ghost btn-md" onClick={handleGoHome}>
              🏠 홈으로
            </button>

            <button className="btn btn-ghost btn-md btn-fixed-width" onClick={handleGoProjects}>
              📁 프로젝트 목록
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  header: {
    marginBottom: 16,
  },

  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "#f9fafb",
  },

  summaryBox: {
    width: "100%",
    minHeight: 300,
    maxHeight: 500,
    background: "#020617",
    padding: 20,
    borderRadius: 12,
    overflowY: "auto",
    border: "1px solid #1f2937",
    boxSizing: "border-box",
  },

  summaryText: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#e5e7eb",
    fontFamily: "inherit",
  },
};