import SearchStore from 'classes/search-store';

export default {

  data() {

    return {
      offers: []
    };
  },
  mounted() {

    console.log('search-results component mounted');
    SearchStore.addObserver('results:change', (results) => this.offers = results);
  }
};
