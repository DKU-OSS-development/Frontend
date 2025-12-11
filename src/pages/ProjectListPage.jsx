import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

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


  const handleDelete = async (projectId) => { // ✅ async 키워드 추가
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    try {
      await fetch(`/api/projects/${projectId}?token=${encodeURIComponent(localStorage.getItem("oss_token"))}`, { method: 'DELETE' });
      
      // 프런트엔드 상태를 갱신하여 삭제된 프로젝트를 목록에서 제거
      setProjects((prevProjects) => 
        prevProjects.filter((project) => project.id !== projectId)
      );
      
      alert("삭제되었습니다.");
      
    } catch (error) {
      console.error("프로젝트 삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }
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
              요약을 진행할 프로젝트를 선택하거나 새로 생성할 수 있습니다.
            </div>
          </div>
        </div>

        <div className="page-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
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
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
              프로젝트 목록
            </h2>
            <button
              className="btn btn-primary btn-md btn-fixed-width"
              onClick={handleCreateProject}
              disabled={isLoading}
            >
              {isLoading ? "처리 중..." : "+ 새 프로젝트 만들기"}
            </button>
          </div>

          {/* 프로젝트 리스트 */}
          <ul style={styles.list}>
            {projects.map((project) => (
              <li
                key={project.id}
    
                style={{ 
                 ...styles.item, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                
          }}
                onClick={() => handleOpenProject(project.id)}
  >
          {/* 1. 왼쪽: 프로젝트 정보 (이름, 날짜)를 div로 묶어줍니다 */}
          <div>
            <div style={styles.name}>{project.name}</div>
            <div style={styles.meta}>
            생성 날짜: {project.createdAt?.toString().slice(0, 10)}
      </div>
    </div>

    {/* 2. 오른쪽: 삭제 버튼 추가 */}
    <button
      className="btn btn-danger btn-sm" // 아까 CSS에 추가한 빨간 버튼 클래스
      onClick={(e) => {
        e.stopPropagation(); // 👈 중요! 이게 없으면 삭제 누를 때 페이지도 같이 이동해버립니다.
        handleDelete(project.id);
      }}
    >
      삭제
    </button>
  </li>
))}
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
    transition: "all 0.2s ease",
  },

  name: {
    fontWeight: 600,
    marginBottom: 4,
    color: "#e5e7eb",
    fontSize: 15,
  },

  meta: {
    fontSize: 13,
    color: "#9ca3af",
  },

  emptyState: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    padding: "40px 0",
  },
};