import { useState } from "react";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import GuidelinesPage from "./pages/GuidelinesPage";
import GuidelineDetailPage from "./pages/GuidelineDetailPage";
import YourProjectPage from "./pages/YourProjectPage";

type Page = "home" | "guidelines" | "guideline-detail" | "your-project";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedGuidelineId, setSelectedGuidelineId] = useState<number>(1);

  const handleNavigate = (page: Page, guidelineId?: number) => {
    if (guidelineId !== undefined) setSelectedGuidelineId(guidelineId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Nav currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}
      {currentPage === "guidelines" && (
        <GuidelinesPage onNavigate={handleNavigate} />
      )}
      {currentPage === "guideline-detail" && (
        <GuidelineDetailPage
          guidelineId={selectedGuidelineId}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === "your-project" && (
        <YourProjectPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}
