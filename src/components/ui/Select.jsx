import { FIELD_CLASS, LABEL_CLASS } from './fieldStyles'

// options : [{ value, label }]
export default function Select({ label, id, options, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <select id={id} className={FIELD_CLASS} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
