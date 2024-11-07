import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo } from 'react'

type Chat = {
  id: string
  name: string
}

interface ChatSidebarProps {
  chats: Chat[]
  currentChat: Chat | null
  onSelectChat: (chatId: string) => void
  onNewChat: () => void
  isExpanded: boolean
  onToggleExpand: () => void
}

export default function ChatSidebar({ 
  chats,
  currentChat,
  onSelectChat,
  onNewChat,
  isExpanded,
  onToggleExpand
}: ChatSidebarProps) {
  const handleSelectChat = useCallback((chatId: string) => {
    onSelectChat(chatId)
  }, [onSelectChat])

  const chatList = useMemo(() => {
    return chats.map((chat) => (
      <button
        key={chat.id}
        onClick={() => handleSelectChat(chat.id)}
        className={`w-full text-left p-2 rounded-lg text-sm truncate ${
          currentChat && currentChat.id === chat.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
      >
        {chat.name}
      </button>
    ))
  }, [chats, currentChat, handleSelectChat])

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#1a1b1e] border-r border-gray-800 flex flex-col transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        {isExpanded && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              AI
            </div>
            <span className="font-bold text-lg text-white">ONLYTECH</span>
          </div>
        )}
        <button onClick={onToggleExpand} className="text-gray-400 hover:text-white">
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isExpanded && (
          <div className="p-4 space-y-2">
            {chatList}
          </div>
        )}
      </div>
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-2 flex items-center justify-center gap-2 ${isExpanded ? '' : 'px-0'}`}
        >
          <MessageSquare size={20} />
          {isExpanded && <span>New chat</span>}
        </button>
      </div>
    </div>
  )
}