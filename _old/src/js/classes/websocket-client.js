import AbstractObservable from './abstract-observable';

class WebSocketClient extends AbstractObservable
{
  constructor({ reconnect = true, reconnectInterval = 5000, reconnectLimit = 10, url })
  {
    super();

    this.instance = null;
    this.reconnect = reconnect;
    this.reconnectInterval = reconnectInterval;
    this.reconnectIntervalID = null;
    this.reconnectLimit = reconnectLimit;
    this.reconnectTrials = 0;
    this.connect(url);
  }
  connect(url, isReconnect = false)
  {
    const ws = new WebSocket(url);

    ws.addEventListener('open', () => {

      this.notifyObservers('open');
      if (isReconnect)
      {
        this.stopReconnect();
      }
    });

    ws.addEventListener('message', (message) => {

      this.notifyObservers('message', message);
    });

    ws.addEventListener('close', () => {

      this.instance.close();
      this.instance = null;
      this.notifyObservers('close');
      this.tryReconnect(url);
    });

    this.instance = ws;
  }
  send(message)
  {
    this.instance.send(message);
  }
  stopReconnect()
  {
    clearInterval(this.reconnectIntervalID);
    this.reconnectIntervalID = null;
    this.reconnectTrials = 0;
  }
  tryReconnect(url)
  {
    if (this.reconnect && this.reconnectIntervalID === null)
    {
      this.notifyObservers('reconnecting');
      this.reconnectIntervalID = setInterval(() => {

        if (this.reconnectTrials <= this.reconnectLimit)
        {
          this.reconnectTrials++;
          this.connect(url, true);
        }

      }, this.reconnectInterval);
    }
  }
}

export default WebSocketClient;
