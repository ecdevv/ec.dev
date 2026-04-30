import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
// Future pages — uncomment when ready:
// import Mods from '@/pages/Mods'
// import Blog from '@/pages/Blog'

declare global {
  interface Window {
    __bootDone: boolean;
    __bootPromise: Promise<void>;
    __bootResolve: () => void;
  }
}

export default function App() {
  // Boot screen is handled by index.html — wait for it to signal done
  // before mounting routes so page animations play fresh.
  const [ready, setReady] = useState(() => window.__bootDone === true);

  useEffect(() => {
    if (ready) return;

    window.__bootPromise.then(() => setReady(true));
  }, [ready]);

  if (!ready) return null

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="mods" element={<Mods />} /> */}
        {/* <Route path="blog" element={<Blog />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
