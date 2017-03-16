import Request from 'classes/request';
import headers from './common/headers';

class SherlockHomesOffers
{
  static find(criteria)
  {
    return new Promise((resolve, reject) => {

      const req = new Request('@@SHERLOCK_HOMES_API_BASE_URL', 'POST', JSON.stringify(criteria), headers);

      req
        .send()
        .then((response) => {

          if (!response.isOK())
          {
            reject(new Error('invalid server response'));
          }
          resolve(response.json());
        })
        .catch((error) => reject(error));
    });
  }
}

export default SherlockHomesOffers;
