import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import LearnPage from './pages/LearnPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import ExamPage from './pages/ExamPage.jsx'
import './App.css'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="learn/:sectionId" element={<LearnPage />} />
            <Route path="quiz/:sectionId" element={<QuizPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="exam" element={<ExamPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}
