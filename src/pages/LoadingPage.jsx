
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.spinner}></div>
      <p style={{ marginTop: 20, fontSize: 18 }}>요약 중입니다...</p>

      <button
        style={styles.cancelButton}
        onClick={() => navigate(-1)}
      >
        취소하기
      </button>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#222",
    color: "#fff",
  },

  spinner: {
    width: 60,
    height: 60,
    border: "6px solid #999",
    borderTop: "6px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  cancelButton: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: "bold",
  }
};

const styleSheet = document.styleSheets[0];

if (styleSheet) {
  styleSheet.insertRule(`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
}
