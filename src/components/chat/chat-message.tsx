import { Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react'

export default function ChatMessage({ 
  role, 
  content,
  timestamp 
}: { 
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}) {
  return (
    <div className={`flex gap-4 ${role === 'assistant' ? 'bg-gray-800/50 p-4 rounded-lg' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        role === 'assistant' ? 'bg-purple-600' : 'bg-gray-600'
      }`}>
        {role === 'assistant' ? 'AI' : 'U'}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            {role === 'assistant' ? 'Assistant' : 'You'}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-gray-200">{content}</p>
        {role === 'assistant' && (
          <div className="flex gap-2 text-gray-400">
            <button className="hover:text-white">
              <Copy size={16} />
            </button>
            <button className="hover:text-white">
              <ThumbsUp size={16} />
            </button>
            <button className="hover:text-white">
              <ThumbsDown size={16} />
            </button>
            <button className="hover:text-white">
              <RefreshCw size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}