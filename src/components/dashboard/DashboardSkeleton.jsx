export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Chargement du tableau de bord">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-24 rounded-2xl bg-white ring-1 ring-stone-200/70" />
        ))}
      </div>
      <div className="h-32 rounded-2xl bg-white ring-1 ring-stone-200/70" />
    </div>
  )
}
