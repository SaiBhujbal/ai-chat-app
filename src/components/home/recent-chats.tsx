export default function RecentChats({ onSelectChat }: { onSelectChat: () => void }) {
  const recentChats = [
    "ChatMinds Hub: Where Ideas Spark and Conversations Ignite",
    "TalkTech Nexus : Where Ideas Spark and Conversation Ignite",
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Automation Recent Chats</h2>
        <button className="text-sm text-purple-400 hover:text-purple-300">
          View All
        </button>
      </div>
      <div className="space-y-2">
        {recentChats.map((chat, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={onSelectChat}
          >
            {chat}
          </div>
        ))}
      </div>
    </div>
  )
}