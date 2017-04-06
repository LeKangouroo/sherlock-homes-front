import json2csv from 'json2csv';
import SearchStore from 'classes/search-store';
import SherlockHomesOffersAPI from 'webservices/sherlock-homes/offers-api';

export default {

  data() {

    return {
      downloadLinks: {
        csv: null,
        json: null
      },
      isLoading: false,
      isResults: false,
      maxPrice: null,
      minSurfaceArea: null,
      offersAPI: null,
      offerType: '',
      zipCodes: []
    };
  },
  methods: {

    deleteZipCodeAt(index) {

      this.zipCodes.splice(index, 1);
    },
    onSubmit(e) {

      e.preventDefault();

      SearchStore.clear();

      this.isLoading = true;

      const searchCriteria = {
        maxPrice: this.maxPrice,
        minSurfaceArea: this.minSurfaceArea,
        offerType: this.offerType,
        zipCodes: this.zipCodes
      };

      this.offersAPI.find(searchCriteria).then((offers) => {

        this.isLoading = false;

        if (offers.length === 0)
        {
          return alert('Aucune offre trouvée.');
        }

        const csv = json2csv({ data: offers, fields: Object.keys(offers[0]), del: ';' });
        const csvBlob = new Blob([csv], { type: 'text/csv' });
        const json = JSON.stringify(offers);
        const jsonBlob = new Blob([json], { type: 'application/json' });

        this.isResults = true;
        this.downloadLinks.json = URL.createObjectURL(jsonBlob);
        this.downloadLinks.csv = URL.createObjectURL(csvBlob);
      })
      .catch((error) => {

        this.isLoading = false;

        console.error(error);

        alert(error.message);
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
  mounted() {

    console.log('search-form component mounted');

    $(this.$el.querySelector('.c-search-form-download-dropdown')).dropdown({ action: 'select' });

    this.offersAPI = new SherlockHomesOffersAPI();

    this.offersAPI.addObserver('new-results-count', function onNotification(count) {

      SearchStore.increaseFoundResults(count);
    });

    this.offersAPI.addObserver('offer-found', function onNotification(offer) {

      SearchStore.addResult(offer);
    });
  }
};
