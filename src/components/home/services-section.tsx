export default function ServicesSection() {
  const services = [
    { name: 'AI Chat', active: true },
    { name: 'BG Remover' },
    { name: 'PDF Scanner' },
    { name: 'Writing' },
    { name: 'Productivity' },
    { name: 'Lifestyle' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Services</h2>
        <input
          type="search"
          placeholder="Search categories"
          className="bg-gray-800 rounded-lg px-4 py-2 text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service.name}
            className={`px-4 py-2 rounded-full text-sm ${
              service.active
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  )
}