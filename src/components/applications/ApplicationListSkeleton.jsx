// Squelette affiché pendant le chargement : il a la forme des vraies cartes,
// ce qui évite que la page « saute » quand les données arrivent.
export default function ApplicationListSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4" aria-busy="true" aria-label="Chargement des candidatures">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse rounded-2xl bg-white p-5 ring-1 ring-stone-200/70">
          <div className="flex justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-stone-200" />
              <div className="h-3 w-1/2 rounded bg-stone-100" />
            </div>
            <div className="h-6 w-20 rounded-full bg-stone-100" />
          </div>
          <div className="mt-6 h-3 w-1/3 rounded bg-stone-100" />
        </div>
      ))}
    </div>
  )
}
