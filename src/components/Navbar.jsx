import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Coach', to: '/coach' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'Challenges', to: '/challenges' },
]

export default function Navbar() {
  return (
    <header>
      <nav aria-label="Primary navigation">
        <NavLink to="/">EcoPilot AI</NavLink>
        <ul>
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
