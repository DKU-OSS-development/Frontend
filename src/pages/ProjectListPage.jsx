import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const API_BASE_URL = "/api";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("oss_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/projects?token=${encodeURIComponent(token)}`
        );

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(
            `프로젝트 목록을 불러오지 못했습니다: ${
              data.detail || data.message || res.status
            }`
          );
          return;
        }

        const data = await res.json();
        const mapped = (data || []).map((p) => ({
          id: p.id,
          name: p.name,
          createdAt: p.created_at || "",
          lastAccessedAt: p.created_at || "",
        }));
        setProjects(mapped);
      } catch (err) {
        console.error(err);
        alert("프로젝트 목록 조회 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);


  const handleCreateProject = async () => {
    const name = window.prompt("새 프로젝트 이름을 입력하세요.");
    if (!name) return;

    const token = localStorage.getItem("oss_token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/projects/create?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(
          `프로젝트 생성 실패: ${
            data.detail || data.message || res.status
          }`
        );
        return;
      }

      alert("프로젝트가 생성되었습니다.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("프로젝트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleOpenProject = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    navigate("/");
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

        <h2 style={styles.title}>프로젝트 선택 페이지</h2>

        <button
          style={styles.createButton}
          onClick={handleCreateProject}
          disabled={isLoading}
        >
          {isLoading ? "처리 중..." : "새 프로젝트 만들기"}
        </button>

        <ul style={styles.list}>
          {projects.map((project) => (
            <li
              key={project.id}
              style={styles.item}
              onClick={() => handleOpenProject(project.id)}
            >
              <div style={styles.name}>{project.name}</div>
              <div style={styles.meta}>
                생성 날짜: {project.createdAt?.toString().slice(0, 10)}
              </div>
              {/*<div style={styles.meta}>
                마지막 접근 날짜: {project.lastAccessedAt
                  ?.toString()
                  .slice(0, 10)}
              </div>*/} {/* 마지막접근 날짜 갱신이 안 되서 공부해보니 백엔드도 건드려야한다고 해서
                일단은 주석처리하였습니다.*/ }
            </li>
          ))}

          {!isLoading && projects.length === 0 && (
            <li style={styles.meta}>프로젝트가 없습니다. 새로 만들어보세요!</li>
          )}
        </ul>
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
    alignItems: "flex-start",
    paddingTop: 40,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    width: "700px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  logoutButton: {
    padding: "6px 12px",
    cursor: "pointer",
  },

  title: {
    marginBottom: 12,
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
    gap: 12,
  },

  item: {
    border: "1px solid #aaa",
    padding: 16,
    cursor: "pointer",
    borderRadius: 4,
  },

  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  meta: {
    fontSize: 12,
    color: "#ccc",
  },
};