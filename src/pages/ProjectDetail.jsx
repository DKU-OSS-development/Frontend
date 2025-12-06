// ProjectDetail.jsx (신규 생성)
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState([]);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    fetchSummaries();
  }, [projectId]);

  const fetchSummaries = async () => {
    try {
      const token = localStorage.getItem('oss_token');
      const response = await fetch(
        `/api/${projectId}/summaries?token=${encodeURIComponent(token)}`
      );
      const data = await response.json();
      setProjectName(data.project_name);
      setSummaries(data.summaries);
    } catch (error) {
      console.error('요약 목록 로드 실패:', error);
    }
  };

  return (
    <div className="project-detail">
      <button 
      onClick={() => navigate('/projects')}>← 프로젝트 목록</button>
      <h2>{projectName} - 히스토리</h2>
      
      <button onClick={() => navigate(`/projects/${projectId}/new-summary`)}>
        새 요약 작성
      </button>

      <div className="summaries-list">
        {summaries.length === 0 ? (
          <p>아직 요약이 없습니다.</p>
        ) : (
          summaries.map((summary) => (
            <div key={summary.id} className="summary-card">
              <div className="summary-date">
                {new Date(summary.created_at).toLocaleString('ko-KR')}
              </div>
              <div className="summary-preview">
                {summary.summary.substring(0, 200)}...
              </div>
              <button onClick={() => navigate(`/summary/${summary.id}`)}>
                전체 보기
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;