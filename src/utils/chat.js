export const createTimestamp = () =>
  new Date().toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const buildAutoReply = (contactName, messageText) => {
  const replies = [
    `Hola ${contactName}, muchas gracias por tu mensaje.`,
    `Recibido. En un momento te respondemos con mas detalle.`,
    `Perfecto, tu mensaje llego correctamente.`,
    `Gracias por escribir. Este chat esta funcionando sin problemas.`,
    `Mensaje recibido. Muchas gracias por comunicarte.`,
    `Vimos tu mensaje: "${messageText}". Gracias por contactarte.`,
  ];

  return replies[Math.floor(Math.random() * replies.length)];
};
