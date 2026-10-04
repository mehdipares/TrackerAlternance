// Styles communs à Input, Select et Textarea : un seul endroit à modifier.
export const LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-stone-700'

// min-h-11 (44 px) : Safari iOS écrase la hauteur d'un champ date vide ; la date est aussi alignée à gauche.
export const FIELD_CLASS = `block min-h-11 w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-stone-900 ring-1 ring-stone-200
  [&::-webkit-date-and-time-value]:text-left
  placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500`
