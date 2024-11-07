import { Share } from 'lucide-react'

export default function ChatHeader() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 bg-gray-800 rounded-full text-xs flex items-center justify-center text-white">
          EN
        </button>
      </div>
      <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 flex items-center gap-2">
        <Share size={16} />
        Share
      </button>
    </header>
  )
}