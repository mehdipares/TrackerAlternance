export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={`grid size-9 place-items-center rounded-xl ${light ? 'bg-white text-brand-700' : 'bg-brand-600 text-white'}`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className={`text-base font-extrabold sm:text-lg tracking-tight ${light ? 'text-white' : 'text-stone-900'}`}>
        Alternance<span className={light ? 'text-brand-200' : 'text-brand-600'}>Tracker</span>
      </span>
    </span>
  )
}
