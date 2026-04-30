import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="relative">
      <Topbar />
      {/* z-1 keeps page content above body::before/after orbs */}
      <main className="relative z-1 max-w-[1800px] mx-auto px-4 sm:px-6 pb-12">
        <Outlet />
      </main>
    </div>
  )
}
