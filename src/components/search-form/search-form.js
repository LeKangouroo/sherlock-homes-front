import json2csv from 'json2csv';
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
          if (offers.length === 0)
          {
            alert('Aucune offre trouvée.');
          }
          else
          {
            SearchStore.setResults(offers);
          }
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
      downloadLinks: {
        csv: null,
        json: null
      },
      isLoading: false,
      isResults: false,
      maxPrice: null,
      minSurfaceArea: null,
      offerType: '',
      zipCodes: []
    };
  },
  mounted() {

    console.log('search-form component mounted');
    SearchStore.addObserver('results:change', (results) => {

      const csv = json2csv({ data: results, fields: Object.keys(results[0]), del: ';' });
      const csvBlob = new Blob([csv], { type: 'text/csv' });
      const json = JSON.stringify(results);
      const jsonBlob = new Blob([json], { type: 'application/json' });

      this.isResults = true;
      this.downloadLinks.json = URL.createObjectURL(jsonBlob);
      this.downloadLinks.csv = URL.createObjectURL(csvBlob);
    });
    $(this.$el.querySelector('.c-search-form-download-dropdown')).dropdown({ action: 'select' });
  }
};
