import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

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
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <BackButton />
          <button style={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </header>

        <h2 style={styles.title}>프로젝트 페이지</h2>

        {/* 텍스트 입력 */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>텍스트 입력</h3>
          <textarea
            style={styles.textarea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="여기에 요약할 텍스트를 입력하세요."
          />
        </div>

        {/* 파일 업로드 */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>파일 업로드 (PDF / TXT / DOCX)</h3>
          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileChange}
          />
          {file && <div style={styles.fileInfo}>선택된 파일: {file.name}</div>}
        </div>

        <button
          style={styles.submitButton}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "요약 중..." : "요약 요청하기"}
        </button>
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
    paddingTop: 30,
    boxSizing: "border-box",
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
    marginBottom: 4,
  },

  logoutButton: {
    padding: "6px 12px",
    cursor: "pointer",
  },

  title: {
    margin: "0 0 10px 0",
  },

  sectionTitle: {
    margin: "0 0 6px 0",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
  },

  textarea: {
    width: "100%",
    minHeight: 160,
    padding: 10,
    boxSizing: "border-box",
    borderRadius: 4,
    border: "1px solid #555",
    background: "#2b2b2b",
    color: "#ddd",
    fontSize: 14,
  },

  fileInfo: {
    marginTop: 4,
    fontSize: 13,
    color: "#aaa",
  },

  submitButton: {
    padding: "10px 14px",
    cursor: "pointer",
    width: "150px",
    marginTop: 6,
  },
};