export default function SummaryPage() {
  return (
    <div style={styles.page}>
      <h2>요약 결과</h2>

      <div style={styles.summaryBox}>
        요약 내용이 여기 표시됩니다.
      </div>

      <div style={styles.buttonRow}>
        <button style={styles.button}>다시 요약하기</button>
        <button style={styles.button}>홈으로</button>
        <button style={styles.button}>프로젝트로 돌아가기</button>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 24 },
  summaryBox: {
    marginTop: 16,
    marginBottom: 16,
    border: "1px solid #ccc",
    padding: 12,
    background: "#f7f7f7",
    minHeight: 150,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 260,
  },
  button: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    background: "#eee",
  },
};
