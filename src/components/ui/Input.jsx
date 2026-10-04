export default function Input({ label, id, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        id={id}
        className="block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-stone-900 ring-1 ring-stone-200
          placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        {...props}
      />
    </div>
  )
}
