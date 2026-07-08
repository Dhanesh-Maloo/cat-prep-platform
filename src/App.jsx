import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SyllabusPage } from './pages/SyllabusPage'
import { SubtopicPage } from './pages/SubtopicPage'
import { PracticePage } from './pages/PracticePage'
import { ResourcesPage } from './pages/ResourcesPage'
import { MockTestsPage } from './pages/MockTestsPage'
import { MockTestRunnerPage } from './pages/MockTestRunnerPage'
import { ResultsPage } from './pages/ResultsPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { SettingsPage } from './pages/SettingsPage'
import { StudyPlannerPage } from './pages/StudyPlannerPage'
import { BookmarksPage } from './pages/BookmarksPage'
import { FlashcardReviewPage } from './pages/FlashcardReviewPage'
import { AdminPage } from './pages/AdminPage'
import { ForumThreadListPage } from './pages/ForumThreadListPage'
import { ForumThreadPage } from './pages/ForumThreadPage'
import { MistakeNotebookPage } from './pages/MistakeNotebookPage'
import { PlaybookPage } from './pages/PlaybookPage'
import { FormulaSheetPage } from './pages/FormulaSheetPage'
import { PercentilePredictorPage } from './pages/PercentilePredictorPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { DailyChallengePage } from './pages/DailyChallengePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="syllabus" element={<SyllabusPage />} />
            <Route path="subtopic/:subtopicId" element={<SubtopicPage />} />
            <Route path="practice/:subtopicId" element={<PracticePage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="mock-tests" element={<MockTestsPage />} />
            <Route path="mock-test/:mockTestId" element={<MockTestRunnerPage />} />
            <Route path="results/:mockTestId" element={<ResultsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="planner" element={<StudyPlannerPage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="flashcards" element={<FlashcardReviewPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="forum/:subtopicId" element={<ForumThreadListPage />} />
            <Route path="forum/thread/:threadId" element={<ForumThreadPage />} />
            <Route path="mistakes" element={<MistakeNotebookPage />} />
            <Route path="playbook" element={<PlaybookPage />} />
            <Route path="formula-sheet" element={<FormulaSheetPage />} />
            <Route path="percentile-predictor" element={<PercentilePredictorPage />} />
            <Route path="daily-challenge" element={<DailyChallengePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
