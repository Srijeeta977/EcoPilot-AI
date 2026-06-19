import { ArrowRight, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'AI Coach', to: '/coach' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'Challenges', to: '/challenges' },
]

export default function Footer() {
  return (
    <footer className="border-t border-emerald-950/10 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-emerald-300 text-emerald-950">
              <Leaf className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold">EcoPilot AI</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-emerald-100/80">
            Climate intelligence for people and teams ready to turn everyday
            choices into measurable carbon progress.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-emerald-200">Product</h2>
          <ul className="mt-4 space-y-3 text-sm text-emerald-100/80">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link className="transition hover:text-white" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-emerald-200">
            Start smarter
          </h2>
          <p className="mt-4 text-sm leading-6 text-emerald-100/80">
            Build a lower-carbon routine with recommendations that adapt to your
            home, travel, food, and energy patterns.
          </p>
          <Link
            to="/coach"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-100"
          >
            Meet your AI Coach
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-emerald-100/70 sm:flex-row sm:items-center sm:justify-between">
          <small>Copyright 2026 EcoPilot AI. All rights reserved.</small>
          <span>Built for measurable climate action.</span>
        </div>
      </div>
    </footer>
  )
}
