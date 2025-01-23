export const styles = {
  layout: {
    container: 'flex h-screen p-4 gap-4 relative',
    sidebar: 'fixed md:relative inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:translate-x-0 h-full',
    mainContent: 'flex-1 glass-panel flex flex-col overflow-hidden relative'
  },
  
  header: {
    container: 'px-6 py-4 flex items-center border-b border-[var(--glass-border)]',
    title: 'text-lg font-medium text-[var(--text-primary)]',
    menuButton: 'md:hidden mr-4 glass-button p-2'
  },

  messages: {
    container: 'flex-1 overflow-y-auto p-6 space-y-6',
    timestamp: 'text-xs text-[var(--text-secondary)] mt-1'
  },

  input: {
    container: 'p-4 border-t border-[var(--glass-border)]',
    form: 'flex items-center gap-4',
    textInput: 'flex-1 glass-input py-3 text-sm',
    button: {
      base: 'glass-button p-2 group',
      active: 'hover:bg-[var(--accent-color)]/20 text-[var(--accent-color)]',
      disabled: 'opacity-50 cursor-not-allowed'
    }
  },

  search: {
    container: 'relative group',
    icon: 'absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] transition-colors group-hover:text-[var(--accent-color)]',
    input: 'w-full glass-input pl-11 pr-4 py-3 text-sm'
  },

  chatButton: {
    base: 'chat-button',
    active: 'active',
    inactive: '',
    text: {
      active: 'text-[var(--accent-color)] font-medium',
      inactive: 'text-[var(--text-secondary)]'
    }
  },

  messageBubble: {
    avatar: 'flex-shrink-0 w-8 h-8 glass-card flex items-center justify-center',
    content: {
      wrapper: 'flex flex-col max-w-2xl',
      bubble: 'glass-card p-4',
      text: 'text-sm leading-relaxed whitespace-pre-wrap text-[var(--text-primary)]'
    }
  },

  promptCard: {
    container: 'glass-card p-6 text-left transition-all duration-300 hover:scale-105',
    iconWrapper: 'w-10 h-10 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center mb-4',
    icon: 'w-5 h-5 text-[var(--accent-color)]',
    title: 'text-lg font-semibold mb-2',
    description: 'text-sm text-[var(--text-secondary)]'
  },

  themeToggle: {
    button: 'glass-button p-2 fixed bottom-4 right-4',
    icon: 'w-5 h-5 text-[var(--text-primary)]'
  }
};