import SearchStore from 'classes/search-store';
import SherlockHomesOffers from 'webservices/sherlock-homes/offers';

export default {

  methods: {

    deleteZipCodeAt(index) {

      this.zipCodes.splice(index, 1);
    },
    onSubmit(e) {

      e.preventDefault();

      this.isLoading = true;
      SherlockHomesOffers
        .find({
          maxPrice: this.maxPrice,
          minSurfaceArea: this.minSurfaceArea,
          offerType: this.offerType,
          zipCodes: this.zipCodes
        })
        .then((offers) => {

          this.isLoading = false;
          SearchStore.setResults(offers);
        })
        .catch((error) => {

          this.isLoading = false;
          alert(error.toString());
        });
    },
    onZipCodeEnter(e) {

      e.preventDefault();

      const el = e.currentTarget;

      if (!el.validity.valid || this.zipCodes.indexOf(el.value) > -1)
      {
        return;
      }
      this.zipCodes.push(el.value);
      el.value = '';
    }
  },
  data() {

    return {
      isLoading: false,
      maxPrice: null,
      minSurfaceArea: null,
      offerType: '',
      zipCodes: []
    };
  },
  mounted() {

    console.log('search-form component mounted');
  }
};
