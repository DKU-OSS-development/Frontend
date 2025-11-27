// src/pages/ProjectListPage.jsx
import { useNavigate } from "react-router-dom";

// 임시 더미 데이터 (백엔드 붙기 전까지 사용)
const MOCK_PROJECTS = [
  {
    id: 1,
    name: "첫 번째 프로젝트",
    createdAt: "2025-11-20",
    lastAccessedAt: "2025-11-27",
  },
  {
    id: 2,
    name: "두 번째 프로젝트",
    createdAt: "2025-11-21",
    lastAccessedAt: "2025-11-26",
  },
];

export default function ProjectListPage() {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    // 나중에 "새 프로젝트 생성" 로직 추가 예정
    alert("새 프로젝트 생성은 나중에 백엔드 연결 후 구현합니다.");
  };

  const handleOpenProject = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div style={styles.page}>
      <h2>프로젝트 선택 페이지</h2>

      {/* 프로젝트 생성 버튼 */}
      <button style={styles.createButton} onClick={handleCreateProject}>
        새 프로젝트 만들기
      </button>

      {/* 이전 프로젝트 목록 (리스트) */}
      <ul style={styles.list}>
        {MOCK_PROJECTS.map((project) => (
          <li
            key={project.id}
            style={styles.item}
            onClick={() => handleOpenProject(project.id)}
          >
            <div style={styles.name}>{project.name}</div>
            <div style={styles.meta}>생성 날짜: {project.createdAt}</div>
            <div style={styles.meta}>
              마지막 접근 날짜: {project.lastAccessedAt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
  },
  createButton: {
    padding: "8px 12px",
    marginBottom: 16,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  item: {
    border: "1px solid #ccc",
    padding: 12,
    cursor: "pointer",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: "#555",
  },
};
