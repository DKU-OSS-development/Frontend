export default function HomePage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span>홈 화면</span>
        <button style={styles.headerButton}>로그아웃</button>
      </header>

      <main style={styles.main}>
        <div style={styles.dashboardBox}>메인 대시보드</div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerButton: {
    padding: "4px 10px",
  },
  main: {},
  dashboardBox: {
    width: 600,
    height: 300,
    background: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
