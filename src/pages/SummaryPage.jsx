import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

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
    <div style={styles.page}>
      <div style={styles.container}>

        
        <header style={styles.header}>
          <BackButton />
          <button style={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </header>

        <h2 style={styles.title}>요약 결과</h2>

        <div style={styles.summaryBox}>
          <pre style={styles.summaryText}>{summary}</pre>
        </div>
{/*<button onClick={() => navigate("/loading")}>
  로딩 테스트
</button> 로딩화면 잘 보이나 확인하기 위한 테스트 버튼*/ }
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

      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: 40,
    boxSizing: "border-box",
    background: "#242424",
    color: "#fff",
  },

  container: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",     
  },

 logoutButton: {
  padding: "6px 12px",
  cursor: "pointer",
  transform: "translateY(10px)",
},



  title: {
    margin: "0 0 10px 0",
    fontSize: 24,
    fontWeight: "bold",
  },

  summaryBox: {
    width: "94%",
    minHeight: 200,
    background: "#333",
    padding: "20px",
    borderRadius: 8,
    overflowY: "auto",
    border: "1px solid #444",
  },

  summaryText: {
    whiteSpace: "pre-wrap",
    margin: 0,
    fontSize: 16,
    lineHeight: 1.5,
    color: "#f1f1f1",
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
    flex: 2,                
    padding: "12px 0",
    border: "1px solid #ccc",
    background: "#ffffff",
    color: "#000000",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
};
