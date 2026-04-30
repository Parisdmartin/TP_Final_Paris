import { useEffect, useRef, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import { seedChats } from './data/seedChats';
import { buildAutoReply, createTimestamp } from './utils/chat';
import './styles/App.css';

function App() {
  const [chats, setChats] = useState(seedChats);
  const [activeChatId, setActiveChatId] = useState(seedChats[0]?.id ?? null);
  const [draftMessage, setDraftMessage] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingReplies, setPendingReplies] = useState([]);
  const scheduledRepliesRef = useRef(new Set());
  const messagesEndRef = useRef(null);

  const filteredChats = (() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return chats;
    }

    return chats.filter((chat) => chat.name.toLowerCase().includes(normalizedTerm));
  })();

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  useEffect(() => {
    pendingReplies.forEach((reply) => {
      if (scheduledRepliesRef.current.has(reply.id)) {
        return;
      }

      scheduledRepliesRef.current.add(reply.id);

      window.setTimeout(() => {
        setChats((currentChats) =>
          currentChats.map((chat) => {
            if (chat.id !== reply.chatId) {
              return chat;
            }

            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: `msg-${crypto.randomUUID()}`,
                  author: 'bot',
                  text: buildAutoReply(chat.name, reply.originalMessage),
                  timestamp: createTimestamp(),
                },
              ],
            };
          }),
        );

        setPendingReplies((currentReplies) =>
          currentReplies.filter((currentReply) => currentReply.id !== reply.id),
        );
        scheduledRepliesRef.current.delete(reply.id);
      }, 1200);
    });
  }, [pendingReplies]);

  const handleAddChat = (event) => {
    event.preventDefault();

    const trimmedName = newChatName.trim();

    if (!trimmedName) {
      return;
    }

    const newChat = {
      id: `chat-${crypto.randomUUID()}`,
      name: trimmedName,
      avatar: trimmedName.slice(0, 1).toUpperCase(),
      status: 'online',
      messages: [
        {
          id: `msg-${crypto.randomUUID()}`,
          author: 'bot',
          text: `Hola ${trimmedName}, gracias por iniciar la conversacion.`,
          timestamp: createTimestamp(),
        },
      ],
    };

    setChats((currentChats) => [newChat, ...currentChats]);
    setActiveChatId(newChat.id);
    setNewChatName('');
    setSearchTerm('');
    setDraftMessage('');
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (!activeChat) {
      return;
    }

    const trimmedMessage = draftMessage.trim();

    if (!trimmedMessage) {
      return;
    }

    const replyId = crypto.randomUUID();

    setChats((currentChats) =>
      currentChats.map((chat) => {
        if (chat.id !== activeChat.id) {
          return chat;
        }

        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: `msg-${crypto.randomUUID()}`,
              author: 'user',
              text: trimmedMessage,
              timestamp: createTimestamp(),
            },
          ],
        };
      }),
    );

    setPendingReplies((currentReplies) => [
      ...currentReplies,
      {
        id: replyId,
        chatId: activeChat.id,
        originalMessage: trimmedMessage,
      },
    ]);
    setDraftMessage('');
  };

  return (
    <main className={`app-shell ${activeChat ? 'app-shell--chat-open' : ''}`}>
      <div className={`app-shell__sidebar ${activeChat ? 'app-shell__sidebar--mobile-hidden' : ''}`}>
        <Sidebar
          chats={filteredChats}
          activeChatId={activeChatId}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          newChatName={newChatName}
          onNewChatNameChange={setNewChatName}
          onAddChat={handleAddChat}
          onSelectChat={setActiveChatId}
        />
      </div>

      <div className={`app-shell__chat ${!activeChat ? 'app-shell__chat--mobile-hidden' : ''}`}>
        <ChatWindow
          chat={activeChat}
          draftMessage={draftMessage}
          onDraftChange={setDraftMessage}
          onSendMessage={handleSendMessage}
          onBack={() => setActiveChatId(null)}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </main>
  );
}

export default App;
