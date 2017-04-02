import AbstractObservable from '../../classes/abstract-observable';
import ws from './common/websocket';

class SherlockHomesOffersAPI extends AbstractObservable
{
  find(criteria)
  {
    return new Promise((resolve, reject) => {

      ws.addEventListener('message', (event) => {

        const message = JSON.parse(event.data);

        if (message.type === 'error')
        {
          return reject(new Error(message.data));
        }
        else if (message.type === 'find-offers:complete')
        {
          return resolve(message.data);
        }
        else if (message.type === 'find-offers:new-results-count')
        {
          this.notifyObservers('new-results-count', message.data);
        }
        else if (message.type === 'find-offers:offer-found')
        {
          this.notifyObservers('offer-found', message.data);
        }
      });
      ws.send(JSON.stringify({ type: 'find-offers', data: criteria }));
    });
  }
}

export default SherlockHomesOffersAPI;
