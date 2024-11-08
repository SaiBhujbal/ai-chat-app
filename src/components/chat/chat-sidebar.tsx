import { MessageSquare, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

type Chat = {
  id: string;
  name: string;
};

interface ChatSidebarProps {
  chats: Chat[];
  currentChat: Chat | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ChatSidebar({
  chats,
  currentChat,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isExpanded,
  onToggleExpand,
}: ChatSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const handleSelectChat = useCallback(
    (chatId: string) => {
      onSelectChat(chatId);
    },
    [onSelectChat]
  );

  const openDeleteModal = (chatId: string) => {
    setChatToDelete(chatId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setChatToDelete(null);
  };

  const confirmDeleteChat = () => {
    if (chatToDelete) {
      onDeleteChat(chatToDelete);
    }
    closeDeleteModal();
  };

  const chatList = useMemo(() => {
    return chats.map((chat) => (
      <div key={chat.id} className="flex items-center space-x-2">
        <button
          onClick={() => handleSelectChat(chat.id)}
          className={`flex-grow text-left p-2 rounded-lg text-sm truncate ${
            currentChat && currentChat.id === chat.id
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          {chat.name}
        </button>
        <button
          onClick={() => openDeleteModal(chat.id)}
          className="text-red-500 hover:text-red-700"
          title="Delete Chat"
        >
          <X size={16} />
        </button>
      </div>
    ));
  }, [chats, currentChat, handleSelectChat]);

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#1a1b1e] border-r border-gray-800 flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Blur background and modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this chat?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteChat}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
        {isExpanded && <div className="p-4 space-y-2">{chatList}</div>}
      </div>
      <div className="p-4">
        <button
          onClick={onNewChat}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-2 flex items-center justify-center gap-2 ${
            isExpanded ? '' : 'px-0'
          }`}
        >
          <MessageSquare size={20} />
          {isExpanded && <span>New chat</span>}
        </button>
      </div>
    </div>
  );
}
