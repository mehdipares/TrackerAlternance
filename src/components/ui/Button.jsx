import Spinner from './Spinner'

const VARIANTS = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20',
  secondary: 'bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50',
  ghost: 'text-stone-600 hover:bg-stone-100',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/20',
  'danger-ghost': 'text-rose-600 hover:bg-rose-50',
}

export default function Button({
  variant = 'primary',
  loading = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600
        disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className="size-4" />}
      {children}
    </button>
  )
}
