import './MessageBubble.css';

function MessageBubble({ message }) {
  return (
    <article
      className={`message-bubble ${
        message.author === 'user' ? 'message-bubble--user' : 'message-bubble--bot'
      }`}
    >
      <p>{message.text}</p>
      <span>{message.timestamp}</span>
    </article>
  );
}

export default MessageBubble;
