import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

export default function SummaryDetailPage() {
  const { summaryId } = useParams();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, [summaryId]);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("oss_token");
      const response = await fetch(
        `/api/summary/${summaryId}?token=${encodeURIComponent(token)}`
      );

      if (!response.ok) throw new Error("요약 로드 실패");

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("요약 로드 실패:", error);
      alert("요약을 불러올 수 없습니다.");
      navigate(-1);
    } finally {
      setLoading(false);
    }
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

  if (!summary) return null;

  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">요약 상세</div>
            <div className="page-subtitle">
              {summary.project_name} · {new Date(summary.created_at).toLocaleString("ko-KR")}
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
        {/* 요약 결과 */}
        <section className="card">
          <h2 style={styles.sectionTitle}>✨ 요약 결과</h2>
          <div style={styles.contentBox}>
            <pre style={styles.contentText}>{summary.summary}</pre>
          </div>
        </section>

        {/* 원본 텍스트 */}
        {summary.original_text && (
          <section className="card" style={{ marginTop: 16 }}>
            <h2 style={styles.sectionTitle}>📄 원본 텍스트</h2>
            <div style={styles.contentBox}>
              <pre style={styles.contentText}>{summary.original_text}</pre>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  sectionTitle: {
    margin: "0 0 16px 0",
    fontSize: 18,
    fontWeight: 600,
    color: "#f9fafb",
  },

  contentBox: {
    width: "100%",
    minHeight: 200,
    maxHeight: 500,
    background: "#020617",
    padding: 20,
    borderRadius: 12,
    overflowY: "auto",
    border: "1px solid #1f2937",
    boxSizing: "border-box",
  },

  contentText: {
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#e5e7eb",
    fontFamily: "inherit",
  },
};