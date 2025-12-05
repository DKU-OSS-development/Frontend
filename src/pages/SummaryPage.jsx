import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";   // ✅ 공통 레이아웃 적용

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
              생성된 요약을 확인하고 다시 요약하거나 다른 페이지로 이동할 수 있다.
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
        <section className="card">
          <h2 style={styles.title}>요약 결과</h2>

          <div style={styles.summaryBox}>
            <pre style={styles.summaryText}>{summary}</pre>
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={handleRetry}>
              다시 요약하기
            </button>

            <button style={styles.button} onClick={handleGoHome}>
              홈으로
            </button>

            <button style={styles.button} onClick={handleGoProjects}>
              프로젝트 목록으로
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  title: {
    margin: "0 0 16px 0",
    fontSize: 20,
    fontWeight: "bold",
  },

  summaryBox: {
    width: "100%",
    minHeight: 200,
    background: "#020617",
    padding: "16px",
    borderRadius: 8,
    overflowY: "auto",
    border: "1px solid #1f2937",
    boxSizing: "border-box",
  },

  summaryText: {
    whiteSpace: "pre-wrap",
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: "#e5e7eb",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    marginTop: 20,
  },

  button: {
    flex: 1,
    padding: "10px 0",
    border: "1px solid #1f2937",
    background: "#111827",
    color: "#f9fafb",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
};
