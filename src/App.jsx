import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoadingPage from "./pages/LoadingPage";
import SummaryPage from "./pages/SummaryPage";
import SummaryDetailPage from "./pages/SummaryDetailPage";
import CreateSummaryPage from "./pages/NewSummaryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/summary/:summaryId" element={<SummaryDetailPage />} />
        <Route path="/projects/:projectId/new" element={<CreateSummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
