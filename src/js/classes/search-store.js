import AbstractObservable from './abstract-observable';

class SearchStore extends AbstractObservable
{
  constructor() {

    super();

    this.state = {
      progress: {
        found: 0,
        processed: 0
      },
      results: []
    };
  }
  addResult(result)
  {
    this.state.results.push(result);
    this.state.progress.processed += 1;
    this.notifyObservers('results:update', this.state.results);
    this.notifyObservers('progress:update', this.state.progress);
  }
  clear()
  {
    this.state.progress.found = 0;
    this.state.progress.processed = 0;
    this.state.results = [];
    this.notifyObservers('clear');
  }
  getProgress()
  {
    return this.state.progress;
  }
  increaseFoundResults(count)
  {
    this.state.progress.found += count;
    this.notifyObservers('progress:update', this.state.progress);
  }
}

export default new SearchStore();
