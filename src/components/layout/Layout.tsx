import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-surface-panel focus:border focus:border-border-subtle focus:text-accent-cyan focus:font-mono focus:text-sm"
      >
        Skip to content
      </a>
      <Topbar />
      {/* z-1 keeps page content above body::before/after orbs */}
      <main id="main-content" className="relative z-1 max-w-[1800px] mx-auto px-4 sm:px-6 pb-12">
        <Outlet />
      </main>
    </div>
  )
}
