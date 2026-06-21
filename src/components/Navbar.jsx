import { Leaf, Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Coach', to: '/coach' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'Challenges', to: '/challenges' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#f7fbf7]/90 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="flex items-center gap-3" aria-label="EcoPilot AI home">
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-950 text-emerald-200 shadow-sm">
            <Leaf className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-semibold text-emerald-950">EcoPilot AI</span>
            <span className="mt-1 text-xs font-medium uppercase text-teal-700">
              Climate intelligence
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-lg border border-emerald-950/10 bg-white/70 p-1 shadow-sm md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-md px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-950',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            aria-label="Start Tracking Carbon Footprint"
            className="hidden rounded-lg bg-emerald-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 sm:inline-flex"
          >
            Start Tracking
          </Link>
          <details className="group relative md:hidden">
            <summary
              aria-label="Open navigation menu"
              className="grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-emerald-950/10 bg-white text-emerald-950 shadow-sm transition hover:bg-emerald-50">
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Open navigation menu</span>
            </summary>
            <div className="absolute right-0 mt-3 w-56 rounded-lg border border-emerald-950/10 bg-white p-2 shadow-xl">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'block rounded-md px-3 py-2 text-sm font-medium transition',
                      isActive
                        ? 'bg-emerald-950 text-white'
                        : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-950',
                    ].join(' ')
                  }
                >
                {item.label}
              </NavLink>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}
