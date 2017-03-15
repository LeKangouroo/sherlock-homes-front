import AbstractObservable from './abstract-observable';

class SearchStore extends AbstractObservable
{
  constructor() {

    this.state = {
      results: []
    };
  }
  setResults(results) {

    this.state.results = results;
    this.notifyObservers('results:change', results);
  }
}
