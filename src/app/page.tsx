'use client'

import { useState, useEffect } from 'react'
import ChatSidebar from '@/components/chat/chat-sidebar'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatMessage from '@/components/chat/chat-message'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

type Chat = {
  id: string
  name: string
  messages: Message[]
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    const savedChats = localStorage.getItem('chatHistory')
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats)
      setChats(parsedChats)
    }
  }, [])

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chats))
    }
  }, [chats])

  const handleSendMessage = async (message: string) => {
    setIsGenerating(true)
    
    const newMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    }
    
    let updatedChat: Chat
    if (currentChat) {
      updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, newMessage]
      }
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === currentChat.id ? updatedChat : chat
        )
      )
    } else {
      updatedChat = {
        id: Date.now().toString(),
        name: message.split('\n')[0].slice(0, 30),
        messages: [newMessage]
      }
      setChats(prevChats => [...prevChats, updatedChat])
    }
    setCurrentChat(updatedChat)

    // Mock AI response - Replace with actual AWS SageMaker API call
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: 'This is a mock response. Replace this with actual AI responses from AWS SageMaker.',
        timestamp: new Date().toISOString()
      }
      
      const updatedChatWithAiResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse]
      }
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === updatedChat.id ? updatedChatWithAiResponse : chat
        )
      )
      setCurrentChat(updatedChatWithAiResponse)
      setIsGenerating(false)
    }, 1000)
  }

  const handleNewChat = () => {
    setCurrentChat(null)
  }

  const handleSelectChat = (chatId: string) => {
    const selectedChat = chats.find(chat => chat.id === chatId)
    if (selectedChat) {
      setCurrentChat(selectedChat)
    }
  }

  return (
    <div className="flex h-screen bg-[#1a1b1e]">
      <ChatSidebar 
        chats={chats}
        currentChat={currentChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      <main className={`flex flex-col flex-grow transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-16'}`}>
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat?.messages.map((message, index) => (
            <ChatMessage 
              key={`${currentChat.id}-${index}`}
              {...message} 
            />
          ))}
        </div>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isGenerating={isGenerating}
        />
      </main>
    </div>
  )
}