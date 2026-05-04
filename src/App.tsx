import { useState, useEffect, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
// Future pages (potentially) - uncomment when ready:
// import Blog from '@/pages/Blog'

export default function App() {
  // Boot screen is handled by index.html - wait for it to signal done
  // before mounting routes so page animations play fresh.
  const [ready, setReady] = useState(() => window.__bootDone === true);

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    window.__bootPromise.then(() => { if (!cancelled) setReady(true) });
    return () => { cancelled = true };
  }, [ready]);

  useEffect(() => {
    const update = () =>
      document.body.classList.toggle('tab-hidden', document.hidden || !document.hasFocus());
    update();
    document.addEventListener('visibilitychange', update);
    window.addEventListener('blur', update);
    window.addEventListener('focus', update);
    return () => {
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('blur', update);
      window.removeEventListener('focus', update);
    };
  }, []);

  // On fast loads the cover element remains until here so there's no frame
  // where the body is exposed between window.load and React's first paint.
  // On slow loads (boot played) the cover was already removed at threshold time.
  useLayoutEffect(() => {
    if (!ready) return;
    document.getElementById('bs-cover')?.remove();
  }, [ready]);

  if (!ready) return null

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="blog" element={<Blog />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
