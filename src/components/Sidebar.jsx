import './Sidebar.css';

function Sidebar({
  chats,
  activeChatId,
  searchTerm,
  onSearchChange,
  newChatName,
  onNewChatNameChange,
  onAddChat,
  onSelectChat,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div>
          <p className="sidebar__eyebrow">Trabajo final</p>
          <h1 className="sidebar__title">Chat Clone</h1>
        </div>

        <form className="sidebar__new-chat" onSubmit={onAddChat}>
          <input
            className="sidebar__input"
            type="text"
            placeholder="Nuevo chat"
            value={newChatName}
            onChange={(event) => onNewChatNameChange(event.target.value)}
          />
          <button className="sidebar__button" type="submit">
            Agregar
          </button>
        </form>

        <input
          className="sidebar__input sidebar__input--search"
          type="text"
          placeholder="Buscar chat..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="sidebar__list">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const lastMessage = chat.messages.at(-1);

            return (
              <button
                key={chat.id}
                className={`chat-item ${activeChatId === chat.id ? 'chat-item--active' : ''}`}
                onClick={() => onSelectChat(chat.id)}
                type="button"
              >
                <span className="chat-item__avatar">{chat.avatar}</span>

                <span className="chat-item__content">
                  <span className="chat-item__row">
                    <strong>{chat.name}</strong>
                    <small>{lastMessage?.timestamp ?? ''}</small>
                  </span>
                  <span className="chat-item__row">
                    <span className="chat-item__status">{chat.status}</span>
                    <span className="chat-item__preview">
                      {lastMessage?.text ?? 'Sin mensajes todavia'}
                    </span>
                  </span>
                </span>
              </button>
            );
          })
        ) : (
          <div className="sidebar__empty">
            <p>No se encontraron chats.</p>
            <span>Proba con otro nombre o crea uno nuevo.</span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
