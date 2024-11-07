import { Send } from 'lucide-react'
import { useState } from 'react'

export default function ChatInput({ 
  onSendMessage,
  isGenerating 
}: { 
  onSendMessage: (message: string) => void
  isGenerating: boolean
}) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isGenerating) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="border-t border-gray-800 p-4">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask or search anything..."
          className="w-full bg-gray-800 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none text-white"
          rows={1}
        />
        <button 
          type="submit" 
          disabled={!message.trim() || isGenerating}
          className="absolute right-2 top-2 text-purple-600 hover:text-purple-500 disabled:opacity-50"
        >
          <Send size={30} />
        </button>
      </form>
    </div>
  )
}