import events from 'core/events';
import exampleComponent from 'components/example/example.vue';

export default {

  components: {
    exampleComponent
  },
  mounted() {

    console.log('home section loaded');
    events.notifyObservers('section:loaded');
  },
  destroyed() {

    events.notifyObservers('section:destroyed');
  }
};
