import SearchStore from 'classes/search-store';
import isNumeric from 'validator/lib/isNumeric';

export default {

  methods: {

    deleteZipCodeAt(index) {

      this.zipCodes.splice(index, 1);
    },
    onSubmit(e) {

      e.preventDefault();

      SearchStore.setResults(['foo', 'bar']);
    },
    onZipCodeEnter(e) {

      e.preventDefault();

      const el = e.currentTarget;

      if (!el.validity.valid)
      {
        return;
      }
      this.zipCodes.push(el.value);

      console.log(this.zipCodes);
    }
  },
  data() {

    return {
      zipCodes: []
    };
  },
  mounted() {

    console.log('search-form component mounted');
  }
};
