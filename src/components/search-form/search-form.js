import Taggle from 'taggle';

export default {

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
