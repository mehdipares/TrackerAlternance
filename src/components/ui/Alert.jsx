const STYLES = {
  error: 'bg-red-50 text-red-700 ring-red-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

// role="alert" : les lecteurs d'écran annoncent le message dès qu'il apparaît.
export default function Alert({ type = 'error', children }) {
  return (
    <div role="alert" className={`rounded-xl px-4 py-3 text-sm ring-1 ${STYLES[type]}`}>
      {children}
    </div>
  )
}
