export default function AutomationSection() {
  const automations = [
    {
      title: "How workout ideal for my body shape",
      description: "Based on your morning routine",
    },
    {
      title: "Today's food and beverages shopping",
      description: "Based on your morning routine",
    },
    {
      title: "Today's food and beverages shopping",
      description: "Based on your morning routine",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Automation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {automations.map((automation, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-lg space-y-2"
          >
            <h3 className="font-semibold">{automation.title}</h3>
            <p className="text-sm text-gray-300">{automation.description}</p>
            <button className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg text-sm">
              Generate
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}