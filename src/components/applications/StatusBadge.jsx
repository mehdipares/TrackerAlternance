import { getStatus } from '../../utils/status'

export default function StatusBadge({ status }) {
  const { label, badge, dot } = getStatus(status)

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}>
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  )
}
