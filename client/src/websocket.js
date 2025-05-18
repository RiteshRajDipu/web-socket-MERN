let socket;

export const connectWebSocket = (onMessage, onOpen, onClose) => {
  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    onOpen?.();
    localStorage.removeItem('wasOffline');
  };

  socket.onmessage = (e) => onMessage?.(e.data);

  socket.onclose = () => {
    onClose?.();
    if (navigator.onLine) {
      setTimeout(() => connectWebSocket(onMessage, onOpen, onClose), 3000);
    }
  };

  socket.onerror = () => socket.close();
};
