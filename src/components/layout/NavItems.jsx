import { NavLink } from 'react-router-dom'

const LINKS = [
  {
    to: '/',
    label: 'Tableau de bord',
    icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  },
  {
    to: '/candidatures',
    label: 'Candidatures',
    icon: 'M4 6h16M4 12h16M4 18h10',
  },
  {
    to: '/kanban',
    label: 'Kanban',
    icon: 'M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v13h-4z',
  },
]

// variant "top" : liens horizontaux dans l'en-tête (écran large).
// variant "bottom" : barre d'onglets fixée en bas (mobile), plus facile à atteindre avec le pouce.
export default function NavItems({ variant }) {
  return LINKS.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'} // sinon "/" serait actif sur toutes les pages
      className={({ isActive }) =>
        variant === 'bottom'
          ? `flex flex-1 flex-col items-center gap-1 py-2 text-xs font-semibold ${isActive ? 'text-brand-700' : 'text-stone-500'}`
          : `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-stone-600 hover:bg-stone-100'}`
      }
    >
      {variant === 'bottom' && (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={link.icon} />
        </svg>
      )}
      {link.label}
    </NavLink>
  ))
}
