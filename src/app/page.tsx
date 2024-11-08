'use client';

import { useState, useEffect } from 'react';
import ChatSidebar from '@/components/chat/chat-sidebar';
import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';
import ChatMessage from '@/components/chat/chat-message';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

type Chat = {
  id: string;
  name: string;
  messages: Message[];
};

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chats));
    }
  }, [chats]);

  const handleSendMessage = async (message: string) => {
    setIsGenerating(true);

    const newMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    let updatedChat: Chat;
    if (currentChat) {
      updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, newMessage],
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat.id ? updatedChat : chat
        )
      );
    } else {
      updatedChat = {
        id: Date.now().toString(),
        name: message.split('\n')[0].slice(0, 30),
        messages: [newMessage],
      };
      setChats((prevChats) => [...prevChats, updatedChat]);
    }
    setCurrentChat(updatedChat);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data from API Gateway:", errorData);
        throw new Error(errorData.error || 'Failed to fetch AI response');
      }

      const data = await response.json();
      console.log("Received data from API Gateway:", data);

      const aiContent = data.response || "No response available";

      const aiResponse: Message = {
        role: 'assistant',
        content: aiContent,
        timestamp: new Date().toISOString(),
      };

      const updatedChatWithAiResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === updatedChat.id ? updatedChatWithAiResponse : chat
        )
      );
      setCurrentChat(updatedChatWithAiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const aiResponse: Message = {
        role: 'assistant',
        content:
          'There was an error fetching the AI response. Please try again.',
        timestamp: new Date().toISOString(),
      };

      const updatedChatWithError = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiResponse],
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === updatedChat.id ? updatedChatWithError : chat
        )
      );
      setCurrentChat(updatedChatWithError);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewChat = () => {
    setCurrentChat(null);
  };

  const handleSelectChat = (chatId: string) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setCurrentChat(selectedChat);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this chat?");
    if (confirmed) {
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1b1e]">
      <ChatSidebar
        chats={chats}
        currentChat={currentChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat} // Pass the delete handler to the sidebar
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      <main
        className={`flex flex-col flex-grow transition-all duration-300 ${
          isSidebarExpanded ? 'ml-64' : 'ml-16'
        }`}
      >
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat?.messages.map((message, index) => (
            <ChatMessage key={`${currentChat.id}-${index}`} {...message} />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} isGenerating={isGenerating} />
      </main>
    </div>
  );
}
