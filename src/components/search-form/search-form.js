import SearchStore from 'classes/search-store';
import Taggle from 'taggle';

export default {

  methods: {

    onSubmit(e) {

      e.preventDefault();

      SearchStore.setResults(['foo', 'bar']);
    }
  },
  data() {

    return {
      taggle: null
    };
  },
  mounted() {

    this.taggle = new Taggle('zipCodesTags');
    console.log('search-form component mounted');
  }
};
