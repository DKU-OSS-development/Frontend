import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

export default function CreateSummaryPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setText("");
    }
  };

  const handleSubmit = async () => {
    if (!text && !file) {
      alert("텍스트를 입력하거나 파일을 업로드해주세요");
      return;
    }

    setLoading(true);
    navigate("/loading");

    try {
      const token = localStorage.getItem("oss_token");
      const formData = new FormData();
      formData.append("token", token);

      if (file) {
        formData.append("file", file);
      } else {
        formData.append("text", text);
      }

      const response = await fetch(`/api/${projectId}/summarize`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("요약 생성 실패");

      const data = await response.json();

      navigate("/summary", {
        state: {
          summary: data.summary,
          projectId: projectId,
          summaryId: data.summary_id,
        },
      });
    } catch (error) {
      console.error("요약 생성 오류:", error);
      alert("요약 생성에 실패했습니다. 다시 시도해주세요.");
      navigate(`/projects/${projectId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    localStorage.removeItem("oss_email");
    navigate("/");
  };

  return (
    <div className="page">
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">새 요약 작성</div>
            <div className="page-subtitle">
              텍스트를 입력하거나 파일을 업로드하여 요약을 생성하세요
            </div>
          </div>
        </div>

        <div className="page-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>

      <main className="page-body">
        <section className="card">
          <div style={styles.infoBox}>
            <div style={styles.infoIcon}>ℹ️</div>
            <div>
              <div style={styles.infoTitle}>지원 파일 형식</div>
              <div style={styles.infoText}>
                <span className="file-type file-type-pdf">PDF</span> · 
                <span className="file-type file-type-txt"> TXT</span> · 
                <span className="file-type file-type-docx"> DOCX</span>
              </div>
            </div>
          </div>

          {/* 텍스트 입력 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              텍스트 직접 입력 {!file && <span style={styles.required}>*</span>}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="요약할 텍스트를 입력하세요...&#10;&#10;예시:&#10;• 긴 문서나 기사의 전문&#10;• 회의록이나 보고서&#10;• 논문 초록"
              style={styles.textarea}
              className="input"
              disabled={!!file}
            />
          </div>

          {/* 구분선 */}
          <div style={styles.divider}>
            <span style={styles.dividerText}>또는</span>
          </div>

          {/* 파일 업로드 */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              파일 업로드 {!text && <span style={styles.required}>*</span>}
            </label>
            <div style={styles.fileUploadArea}>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".txt,.pdf,.docx"
                style={styles.fileInput}
                disabled={!!text}
              />
              <label htmlFor="file-upload" style={styles.fileLabel}>
                <div style={styles.fileIcon}>📁</div>
                <div style={styles.fileLabelText}>
                  {file ? file.name : "파일을 선택하거나 드래그하세요"}
                </div>
                <div style={styles.fileLabelSubtext}>
                  PDF, TXT, DOCX (최대 10MB)
                </div>
              </label>
            </div>
            
            {file && (
              <div style={styles.fileInfo}>
                <div style={styles.fileInfoLeft}>
                  <span style={styles.fileCheckmark}>✓</span>
                  <span>{file.name}</span>
                  <span style={styles.fileSize}>
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="btn btn-ghost btn-sm"
                >
                  ✕ 제거
                </button>
              </div>
            )}
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
            disabled={loading || (!text && !file)}
            style={{ marginTop: 24}}
          >
            {loading ? "처리 중..." : "✨ 요약 생성하기"}
          </button>
        </section>
      </main>
    </div>
  );
}

const styles = {
  infoBox: {
    display: "flex",
    gap: 12,
    padding: 16,
    background: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    borderRadius: 12,
    marginBottom: 24,
  },

  infoIcon: {
    fontSize: 24,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f9fafb",
    marginBottom: 4,
  },

  infoText: {
    fontSize: 13,
    color: "#cbd5e1",
  },

  formGroup: {
    marginBottom: 24,
  },

  label: {
    display: "block",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#f9fafb",
  },

  required: {
    color: "#ef4444",
    marginLeft: 4,
  },

  textarea: {
    width: "100%",
    minHeight: 250,
    padding: 16,
    fontSize: 14,
    lineHeight: 1.6,
    resize: "vertical",
    fontFamily: "inherit",
    background: "#0f172a",
    border: "1px solid #374151",
    borderRadius: 12,
    color: "#f9fafb",
    boxSizing: "border-box",
  },

  divider: {
    position: "relative",
    textAlign: "center",
    margin: "32px 0",
  },

  dividerText: {
    background: "#1e293b",
    padding: "0 16px",
    color: "#64748b",
    fontSize: 13,
    fontWeight: 600,
    position: "relative",
    zIndex: 1,
  },

  fileUploadArea: {
    position: "relative",
  },

  fileInput: {
    display: "none",
  },

  fileLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
    background: "#0f172a",
    border: "2px dashed #374151",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s",
  },

  fileIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  fileLabelText: {
    fontSize: 15,
    fontWeight: 500,
    color: "#f9fafb",
    marginBottom: 4,
  },

  fileLabelSubtext: {
    fontSize: 13,
    color: "#64748b",
  },

  fileInfo: {
    marginTop: 12,
    padding: 16,
    background: "#0f172a",
    borderRadius: 12,
    fontSize: 14,
    color: "#cbd5e1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #1e293b",
  },

  fileInfoLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  fileCheckmark: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: 700,
  },

  fileSize: {
    color: "#64748b",
    fontSize: 13,
  },
};