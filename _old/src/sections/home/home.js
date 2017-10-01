import events from 'core/events';
import searchFormComponent from 'components/search-form/search-form.vue';
import searchResultsComponent from 'components/search-results/search-results.vue';
import SearchStore from 'classes/search-store';

export default {

  components: {
    searchFormComponent,
    searchResultsComponent
  },
  mounted() {

    console.log('home section loaded');
    events.notifyObservers('section:loaded');
    SearchStore.addObserver('results:change', (results) => {

      console.log('results', results);
    });
  },
  destroyed() {

    events.notifyObservers('section:destroyed');
  }
};
