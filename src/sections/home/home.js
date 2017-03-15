import events from 'core/events';
import searchFormComponent from 'components/search-form/search-form.vue';
import SearchStore from 'classes/search-store';

export default {

  components: {
    searchFormComponent
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
