// 각 페이지에 뒤로가기 버튼 추가하였습니다.
// 기존코드에 추가

import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        padding: "4px 8px",
        background: "#fff",
        color: "#000",
        border: "1px solid #ccc",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
      }}
    >
      ← 뒤로가기
    </button>
  );
}

