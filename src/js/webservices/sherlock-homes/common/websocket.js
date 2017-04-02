const ws = new WebSocket('@@SHERLOCK_HOMES_API_BASE_URL');

ws.addEventListener('open', () => console.log('WebSocket connection opened'));

export default ws;
