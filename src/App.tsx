import React, { useState } from 'react';
import { Menu, X, RefreshCw, Paperclip, Image, Send, Bot, User } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ChatButton } from './components/ChatButton';
import { MessageBubble } from './components/MessageBubble';
import { MessageInput } from './components/MessageInput';
import { ThemeToggle } from './components/ThemeToggle';
import { PromptCard } from './components/PromptCard';
import { initialChats, type Chat } from './data/chats';
import { styles } from './styles/components';

const commonPrompts = [
  {
    title: 'Write a to-do list',
    description: 'Create a to-do list for a personal project or task',
    icon: 'CheckSquare'
  },
  {
    title: 'Generate an email',
    description: 'Generate an email to reply to a job offer',
    icon: 'Mail'
  },
  {
    title: 'Summarize text',
    description: 'Summarise this article or text for me in one paragraph',
    icon: 'FileText'
  },
  {
    title: 'Explain AI',
    description: 'How does AI work in a technical capacity',
    icon: 'Brain'
  }
];

function App() {
  const [chats] = useState<Chat[]>(initialChats);
  const [currentChat, setCurrentChat] = useState<Chat>(chats[0]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

    const newMessage = {
      id: Date.now(),
      content: input,
      sender: 'user' as const,
      timestamp
    };

    setCurrentChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    setInput('');
  };

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.layout.container}>
      {/* Sidebar */}
      <div className={`${styles.layout.sidebar} ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="glass-panel h-full p-4 flex flex-col">
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            <div>
              <h2 className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider px-4 mb-3">
                Recent Chats
              </h2>
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <ChatButton
                    key={chat.id}
                    title={chat.title}
                    isActive={currentChat.id === chat.id}
                    onClick={() => setCurrentChat(chat)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.layout.mainContent}>
        {/* Welcome Section */}
        {currentChat.messages.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl font-bold">
                Hi there, <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">John</span>
              </h1>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                What would you like to know?
              </h2>
              <p className="text-[var(--text-secondary)]">
                Use one of the most common prompts below or use your own to begin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
              {commonPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.title}
                  title={prompt.title}
                  description={prompt.description}
                  icon={prompt.icon}
                  onClick={() => setInput(prompt.description)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <div className={styles.header.container}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={styles.header.menuButton}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <h1 className={styles.header.title}>{currentChat.title}</h1>
        </div>

        {/* Messages */}
        <div className={styles.messages.container}>
          {currentChat.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>

        {/* Input */}
        <div className={styles.input.container}>
          <form onSubmit={handleSubmit} className={styles.input.form}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask whatever you want..."
              className={styles.input.textInput}
            />
            <div className="flex items-center gap-2">
              <button type="button" className={styles.input.button.base}>
                <Paperclip className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              <button type="button" className={styles.input.button.base}>
                <Image className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              <button
                type="submit"
                disabled={!input.trim()}
                className={`${styles.input.button.base} ${input.trim() ? styles.input.button.active : styles.input.button.disabled}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
}

export default App;