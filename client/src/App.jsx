import React, { useEffect, useState } from 'react';
import { connectWebSocket } from './websocket';

const App = () => {
  const [status, setStatus] = useState('Connecting...');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!navigator.onLine || localStorage.getItem('wasOffline')) {
      setStatus('Failed to connect to the server.');
      return;
    }

    const onMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const onOpen = () => {
      setStatus('Connected');
    };

    const onClose = () => {
      setStatus('Disconnected. Retrying...');
    };

    connectWebSocket(onMessage, onOpen, onClose);

    const handleStatusChange = () => {
      if (navigator.onLine) {
        setStatus('Reconnecting...');
        connectWebSocket(onMessage, onOpen, onClose);
      } else {
        setStatus('Offline');
        localStorage.setItem('wasOffline', 'true');
      }
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  if (status === 'Failed to connect to the server.') {
    return <h2 style={{ color: 'red' }}>{status}</h2>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Status: <span style={{ color: status.includes('Connected') ? 'green' : 'orange' }}>{status}</span></h2>
      <h3>Messages:</h3>
      {messages.map((m, i) => <p key={i}>{m}</p>)}
    </div>
  );
};

export default App;
