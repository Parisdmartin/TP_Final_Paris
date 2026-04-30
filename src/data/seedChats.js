export const seedChats = [
  {
    id: 'chat-1',
    name: 'Sofi',
    avatar: 'S',
    status: 'online',
    messages: [
      {
        id: 'msg-1',
        author: 'bot',
        text: 'Hola, muchas gracias por escribir.',
        timestamp: '10:02',
      },
      {
        id: 'msg-2',
        author: 'user',
        text: 'Hola, queria consultar si recibiste mi mensaje.',
        timestamp: '10:03',
      },
    ],
  },
  {
    id: 'chat-2',
    name: 'Equipo React',
    avatar: 'R',
    status: 'ultima vez hoy a las 09:40',
    messages: [
      {
        id: 'msg-3',
        author: 'bot',
        text: 'Buen dia, este chat esta funcionando correctamente.',
        timestamp: '09:40',
      },
    ],
  },
  {
    id: 'chat-3',
    name: 'Tutor Virtual',
    avatar: 'T',
    status: 'offline',
    messages: [
      {
        id: 'msg-4',
        author: 'bot',
        text: 'Gracias por comunicarte. Te respondemos a la brevedad.',
        timestamp: 'Ayer',
      },
    ],
  },
];
