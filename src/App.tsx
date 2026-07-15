import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainSection from './components/MainSection'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainSection />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
