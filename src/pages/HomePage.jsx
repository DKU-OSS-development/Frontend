import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import "./PageLayout.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("oss_token");
    const userEmail = localStorage.getItem("oss_email");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
      return;
    }

    if (userEmail) setEmail(userEmail);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("oss_token");
    localStorage.removeItem("oss_email");
    navigate("/");
  };

  const handleGoProjects = () => {
    navigate("/projects");
  };

  return (
    <div className="page">
      {/* 상단 헤더 */}
      <header className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton />
          <div>
            <div className="page-title">홈</div>
            <div className="page-subtitle">
              {email ? `${email}님, 환영합니다.` : "로그인 정보 로딩 중..."}
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
          <div className="card-title">👋 환영합니다!</div>
          <div className="card-subtitle">
            문서를 빠르게 요약하고 프로젝트별로 관리할 수 있는 대시보드입니다.
          </div>

          <p className="home-description">
            문서를 빠르게 요약하고 프로젝트별로 관리하세요. <br />
            <span className="file-type file-type-pdf">PDF</span> /
            <span className="file-type file-type-txt"> TXT </span> /
            <span className="file-type file-type-docx"> DOCX </span>
            파일을 업로드하거나 직접 텍스트를 입력하면 <br />
            Claude AI가 핵심 요약을 제공합니다.
          </p>

          <div className="flex-center" style={{ marginTop: '24px' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/projects')}
      >
              프로젝트 목록 보기
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}