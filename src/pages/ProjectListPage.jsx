import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";   // 공통 레이아웃 적용

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
    <div className="page">
      {/* 상단 헤더 */}
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">프로젝트 선택</div>
            <div className="page-subtitle">
              요약을 진행할 프로젝트를 선택하거나 새로 생성할 수 있다.
            </div>
          </div>
        </div>

        <div className="page-actions">
          <button className="btn btn-ghost" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="page-body">
        <section className="card">
          {/* 제목 + 새 프로젝트 버튼 줄 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>프로젝트 선택 페이지</h2>
            <button
              className="btn btn-primary"
              onClick={handleCreateProject}
              disabled={isLoading}
            >
              {isLoading ? "처리 중..." : "새 프로젝트 만들기"}
            </button>
          </div>

          {/* 프로젝트 리스트 */}
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
                {/* 
                <div style={styles.meta}>
                  마지막 접근 날짜: {project.lastAccessedAt
                    ?.toString()
                    .slice(0, 10)}
                </div>
                */}
              </li>
            ))}

            {!isLoading && projects.length === 0 && (
              <li style={styles.meta}>
                프로젝트가 없습니다. 새로 만들어보세요!
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  item: {
    border: "1px solid #1f2937",
    padding: 16,
    cursor: "pointer",
    borderRadius: 8,
    backgroundColor: "#020617",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
  },

  name: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#e5e7eb",
  },

  meta: {
    fontSize: 12,
    color: "#9ca3af",
  },
};
