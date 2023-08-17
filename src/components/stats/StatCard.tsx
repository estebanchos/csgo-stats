interface IStat {
  name: string
  value: number
}

export default function StatCard({name, value}: IStat) {
  return (
    <article key={name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8 col-span-1">
      <p className="text-sm font-medium leading-6 text-gray-400">{name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-white">{value}</span>
      </p>
    </article>
  )
}