import { useEffect } from 'react';
import { EditorPage } from './pages/EditorPage';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  const isEditor = window.location.pathname.replace(/\/$/, '') === '/editor';

  useEffect(() => {
    document.title = isEditor ? 'Editor — CV Builder' : 'CV Builder — Make your next CV with clarity';
  }, [isEditor]);

  return isEditor ? <EditorPage /> : <LandingPage />;
}
