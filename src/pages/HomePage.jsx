import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("oss_token");
    const userEmail = localStorage.getItem("oss_email");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (userEmail) setEmail(userEmail);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    localStorage.removeItem("oss_email");
    navigate("/");
  };

  const handleGoProjects = () => {
    navigate("/projects");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <BackButton />
          <button style={styles.headerButton} onClick={handleLogout}>
            로그아웃
          </button>
        </header>
        
{/* <button
  style={{marginTop: "20px", padding: "10px 20px"}}
  onClick={() =>
    navigate("/summary", {
      state: {
        summary: `테스트 요약입니다!\n\n- 첫 번째 줄\n- 두 번째 줄\n- 세 번째 줄`,
        projectId: 123,
      },
    })
  }
>
  요약 페이지 미리보기 ( 요약 기능 테스트하기 위해 요약창으로 넘어가기위한 테스트용 버튼 추가 일단 해봤습니다-민준)
</button> */}

        {/* 대시보드 */}
        <main style={styles.main}>
          <div style={styles.dashboardBox}>
            <h2 style={styles.welcome}>
              👋 환영합니다!
            </h2>

            <p style={styles.description}>
              문서를 빠르게 요약하고 프로젝트별로 관리하세요. <br />
              <span style={{ color: "red", fontWeight: "bold" }}>PDF</span> /
              <span style={{ color: "dodgerblue", fontWeight: "bold" }}> TXT </span> /
              <span style={{ color: "green", fontWeight: "bold" }}> DOCX </span>
              파일을 업로드하거나 직접 텍스트를 입력하면 <br />
              Claude AI가 핵심 요약을 제공합니다.
</p> 
{/* 만들어주신 대시보드에 내용 추가했습니다. */}

            <button style={styles.projectButton} onClick={handleGoProjects}>
              프로젝트 목록 보기
            </button>
          </div>
        </main>

      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#222",
  },

  container: {
    width: "600px",  
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerButton: {
    padding: "6px 12px",
    cursor: "pointer",
  },

  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  dashboardBox: {
    width: "100%",  
    background: "#eee",
    borderRadius: 12,
    padding: "30px 40px",
    textAlign: "center",
  },

  welcome: {
    margin: 0,
    marginBottom: 20,
    color: "#222",
  },

  description: {
    lineHeight: "1.6",
    fontSize: 15,
    marginBottom: 30,
    color: "#444",
  },

  projectButton: {
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
  },
};