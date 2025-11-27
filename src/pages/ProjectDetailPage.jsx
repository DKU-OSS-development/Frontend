// src/pages/ProjectDetailPage.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProjectDetailPage() {
  const { id } = useParams(); // /projects/:id 로부터 id 가져오기
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFile(selected ?? null);
  };

  const handleSubmit = () => {
    // 나중에 텍스트 + 파일을 백엔드로 보내는 로직 추가
    if (!text && !file) {
      alert("텍스트를 입력하거나 파일을 업로드해주세요.");
      return;
    }
    alert("요약 요청은 나중에 백엔드 연결 후 구현합니다.");
  };

  return (
    <div style={styles.page}>
      <h2>프로젝트 페이지 (ID: {id})</h2>

      {/* 텍스트 입력 */}
      <div style={styles.section}>
        <h3>텍스트 입력</h3>
        <textarea
          style={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 요약할 텍스트를 입력하세요."
        />
      </div>

      {/* 파일 업로드 */}
      <div style={styles.section}>
        <h3>파일 업로드 (PDF / TXT / DOCX)</h3>
        <input
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileChange}
        />
        {file && (
          <div style={styles.fileInfo}>
            선택된 파일: {file.name}
          </div>
        )}
      </div>

      <button style={styles.submitButton} onClick={handleSubmit}>
        요약 요청하기
      </button>
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  textarea: {
    width: "100%",
    minHeight: 200,
    padding: 8,
    boxSizing: "border-box",
  },
  fileInfo: {
    marginTop: 8,
    fontSize: 13,
    color: "#555",
  },
  submitButton: {
    marginTop: 8,
    padding: "8px 12px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};
