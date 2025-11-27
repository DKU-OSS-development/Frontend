export default function LoginPage() {
  return (
    <div style={styles.page}>
      <h2 style={{ marginBottom: 24 }}>로그인 / 회원가입</h2>

      <div style={styles.inputBox}>
        <input
          type="email"
          placeholder="이메일"
          style={styles.input}
        />
      </div>

      <div style={styles.inputBox}>
        <input
          type="password"
          placeholder="비밀번호"
          style={styles.input}
        />
      </div>

      <button style={styles.button}>로그인</button>
      <button style={styles.button}>회원가입</button>
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
    gap: 12,
  },
  inputBox: {
    width: 260,
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    boxSizing: "border-box",
  },
  button: {
    width: 260,
    padding: "8px 0",
    border: "1px solid #ccc",
    background: "#eee",
    cursor: "pointer",
  },
};
