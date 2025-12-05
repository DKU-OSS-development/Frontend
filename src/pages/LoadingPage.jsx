import { useNavigate } from "react-router-dom";
import "./PageLayout.css";   // 반드시 추가

export default function LoadingPage() {
  const navigate = useNavigate();

  return (
    <div className="fullscreen-center">
      <div className="spinner"></div>

      <p style={{ marginTop: 20, fontSize: 16 }}>요약 중입니다...</p>

      <button
        className="btn btn-ghost"
        style={{ marginTop: 20 }}
        onClick={() => navigate(-1)}
      >
        취소하기
      </button>
    </div>
  );
}

