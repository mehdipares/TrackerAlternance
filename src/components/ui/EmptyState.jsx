export default function EmptyState({ icon, title, children }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-stone-200 px-6 py-12 text-center">
      <div className="text-4xl" aria-hidden="true">
        {icon}
      </div>
      <h2 className="mt-3 font-bold text-stone-900">{title}</h2>
      <div className="mx-auto mt-1 max-w-sm text-sm text-stone-500">{children}</div>
    </div>
  )
}
