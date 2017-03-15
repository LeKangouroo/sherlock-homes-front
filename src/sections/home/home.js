import events from 'core/events';
import searchFormComponent from 'components/search-form/search-form.vue';

export default {

  components: {
    searchFormComponent
  },
  mounted() {

    console.log('home section loaded');
    events.notifyObservers('section:loaded');
  },
  destroyed() {

    events.notifyObservers('section:destroyed');
  }
};
