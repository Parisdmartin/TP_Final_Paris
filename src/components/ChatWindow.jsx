import MessageBubble from './MessageBubble';
import './ChatWindow.css';

function ChatWindow({
  chat,
  draftMessage,
  onDraftChange,
  onSendMessage,
  onBack,
  messagesEndRef,
}) {
  if (!chat) {
    return (
      <section className="chat-window chat-window--empty">
        <div className="empty-panel">
          <p className="empty-panel__eyebrow">Selecciona un chat</p>
          <h2>Tu conversacion va a aparecer aca</h2>
          <span>Crea un chat nuevo desde la barra lateral para empezar.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="chat-window">
      <header className="chat-window__header">
        <button className="chat-window__back" type="button" onClick={onBack}>
          Volver
        </button>

        <div className="chat-window__user">
          <span className="chat-window__avatar">{chat.avatar}</span>
          <div>
            <h2>{chat.name}</h2>
            <p>{chat.status}</p>
          </div>
        </div>
      </header>

      <div className="chat-window__messages">
        {chat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-window__composer" onSubmit={onSendMessage}>
        <input
          className="chat-window__input"
          type="text"
          placeholder={`Escribe un mensaje para ${chat.name}`}
          value={draftMessage}
          onChange={(event) => onDraftChange(event.target.value)}
        />
        <button className="chat-window__send" type="submit">
          Enviar
        </button>
      </form>
    </section>
  );
}

export default ChatWindow;
