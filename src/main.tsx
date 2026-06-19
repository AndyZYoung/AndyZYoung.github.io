import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import PersonalSite from './site/PersonalSite.tsx'
import App from './App.tsx'
import { VersionRoute } from './VersionRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<div style={{ height: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<PersonalSite />} />
          <Route path="/gallery" element={<App />} />
          <Route path="/:slug" element={<VersionRoute />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
)
