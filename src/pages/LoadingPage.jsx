export default function LoadingPage() {
  return (
    <div style={styles.page}>
      <div style={styles.circle} />
      <div style={{ marginTop: 16 }}>요약 중...</div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#ccc",
  },
};
