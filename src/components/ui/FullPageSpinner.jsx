import Spinner from './Spinner'

export default function FullPageSpinner() {
  return (
    <div className="grid min-h-dvh place-items-center text-brand-600">
      <Spinner className="size-8" />
    </div>
  )
}
