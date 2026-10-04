import Logo from '../ui/Logo'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-2">
      {/* Panneau de présentation : uniquement sur grand écran */}
      <aside className="relative hidden overflow-hidden bg-brand-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-600" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-16 size-80 rounded-full bg-brand-900/40" aria-hidden="true" />

        <div className="relative">
          <Logo light />
        </div>
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
            Chaque candidature,
            <br />
            suivie jusqu’au oui.
          </h2>
          <p className="mt-4 max-w-sm text-brand-100">
            Statuts, relances et tableau de bord : toute votre recherche d’alternance au même endroit.
          </p>
        </div>
      </aside>

      <main className="flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">{title}</h1>
          <p className="mt-1.5 text-stone-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-stone-500">{footer}</p>
        </div>
      </main>
    </div>
  )
}
