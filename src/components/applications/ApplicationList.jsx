import ApplicationCard from './ApplicationCard'

export default function ApplicationList({ applications, onEdit }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {applications.map((application) => (
        // key : identifiant stable qui permet à React de savoir quel élément a changé.
        <li key={application.id}>
          <ApplicationCard application={application} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}
