import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectAndSummaries();
  }, [id]);

  const fetchProjectAndSummaries = async () => {
    try {
      const token = localStorage.getItem("oss_token");
      
      // 요약 목록 가져오기
      const response = await fetch(
        `/api/${id}/summaries?token=${encodeURIComponent(token)}`
      );
      
      if (!response.ok) throw new Error("요약 목록 로드 실패");
      
      const data = await response.json();
      setProject({ id, name: data.project_name });
      setSummaries(data.summaries);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      alert("프로젝트 정보를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewSummary = () => {
    navigate(`/projects/${id}/new`); 
  };

  const handleViewSummary = (summaryId) => {
    navigate(`/summary/${summaryId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-body" style={{ textAlign: "center", paddingTop: 100 }}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">{project?.name || "프로젝트"}</div>
            <div className="page-subtitle">
              이 프로젝트의 요약 히스토리를 확인하고 새로운 요약을 작성할 수 있습니다
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
            <h2 style={styles.title}>📋 요약 히스토리</h2>
            <button className="btn btn-primary btn-md btn-fixed-width" onClick={handleNewSummary}>
              ➕ 새 요약 작성
            </button>
          </div>

          {summaries.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>아직 요약이 없습니다</p>
              <p style={styles.emptySubtext}>새 요약을 작성해보세요</p>
            </div>
          ) : (
            <div style={styles.summariesList}>
              {summaries.map((summary) => (
                <div key={summary.id} style={styles.summaryCard}>
                  <div style={styles.summaryHeader}>
                    <span style={styles.summaryDate}>
                      {new Date(summary.created_at).toLocaleString("ko-KR")}
                    </span>
                  </div>
                  <div style={styles.summaryPreview}>
                    {summary.summary.substring(0, 150)}
                    {summary.summary.length > 150 ? "..." : ""}
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ marginTop: 12 }}
                    onClick={() => handleViewSummary(summary.id)}
                  >
                    전체 보기 →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "#f9fafb",
  },

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },

  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    margin: "0 0 8px 0",
  },

  emptySubtext: {
    fontSize: 14,
    color: "#6b7280",
    margin: 0,
  },

  summariesList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  summaryCard: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: 20,
    transition: "all 0.2s",
    cursor: "pointer",
  },

  summaryHeader: {
    marginBottom: 12,
  },

  summaryDate: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: 500,
  },

  summaryPreview: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#cbd5e1",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};