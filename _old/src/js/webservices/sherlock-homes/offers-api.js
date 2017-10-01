import AbstractObservable from '../../classes/abstract-observable';
import ws from './common/websocket';

class SherlockHomesOffersAPI extends AbstractObservable
{
  find(criteria)
  {
    return new Promise((resolve, reject) => {

      const self = this;

      function onMessage(event) {

        const message = JSON.parse(event.data);

        if (message.type === 'failure')
        {
          reject(message.data);
          ws.addObserver('message', onMessage);
        }
        else if (message.type === 'find-offers:error')
        {
          self.notifyObservers('error', message.data);
        }
        else if (message.type === 'find-offers:complete')
        {
          resolve(message.data);
          ws.removeObserver('message', onMessage);
        }
        else if (message.type === 'find-offers:new-results-count')
        {
          self.notifyObservers('new-results-count', message.data);
        }
        else if (message.type === 'find-offers:offer-found')
        {
          self.notifyObservers('offer-found', message.data);
        }
        else
        {
          reject(new Error('unexpected message type from the server'));
        }
      }
      ws.addObserver('message', onMessage);
      ws.send(JSON.stringify({ type: 'find-offers', data: criteria }));
    });
  }
}

export default SherlockHomesOffersAPI;
