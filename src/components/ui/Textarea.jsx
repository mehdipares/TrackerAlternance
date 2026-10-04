import { FIELD_CLASS, LABEL_CLASS } from './fieldStyles'

export default function Textarea({ label, id, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <textarea id={id} rows={4} className={`${FIELD_CLASS} resize-y`} {...props} />
    </div>
  )
}
