import WebSocketClient from 'classes/websocket-client';

const ws = new WebSocketClient({ url: '@@SHERLOCK_HOMES_API_BASE_URL' });

ws.addObserver('close', () => console.log('WebSocket connection closed'));
ws.addObserver('open', () => console.log('WebSocket connection opened'));
ws.addObserver('reconnecting', () => console.log('Reconnecting to the server...'));

export default ws;
