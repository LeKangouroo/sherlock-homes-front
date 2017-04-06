import numeral from 'numeral';
import 'numeral/locales/fr';
import orderBy from 'lodash/orderBy';
import SearchStore from 'classes/search-store';

export default {

  data() {

    return {
      displayedOffers: [],
      foundCount: 0,
      isLoading: false,
      processedCount: 0,
      sortKey: 'price',
      sortOrder: 'asc',
      offers: []
    };
  },
  beforeCreate() {

    numeral.locale('fr');
  },
  mounted() {

    console.log('search-results component mounted');
    SearchStore.addObserver('search:start', () => {

      this.isLoading = true;
    });
    SearchStore.addObserver('search:end', () => {

      this.sortOffers();
      this.isLoading = false;
    });
    SearchStore.addObserver('progress:update', (progress) => {

      this.foundCount = progress.found;
      this.processedCount = progress.processed;
    });
    SearchStore.addObserver('results:update', (results) => {

      this.offers = results;
    });
    SearchStore.addObserver('clear', () => {

      this.displayedOffers = [];
      this.foundCount = 0;
      this.offers = [];
      this.processedCount = 0;
    });
  },
  filters: {

    formatPrice(price)
    {
      return numeral(price).format('0,0[.]00');
    },
    formatNumber(number)
    {
      return numeral(number).format('0,0[.]0');
    }
  },
  methods: {

    onHeadCellClick(name)
    {
      if (name === this.sortKey)
      {
        this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
      }
      else
      {
        this.sortKey = name;
      }
      this.sortOffers();
    },
    sortOffers()
    {
      this.displayedOffers = orderBy(this.offers, [this.sortKey], [this.sortOrder]);
    }
  }
};
