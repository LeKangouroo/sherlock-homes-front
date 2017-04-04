import numeral from 'numeral';
import 'numeral/locales/fr';
import orderBy from 'lodash/orderBy';
import SearchStore from 'classes/search-store';

export default {

  data() {

    return {
      displayedOffers: [],
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
    SearchStore.addObserver('results:update', (results) => {

      this.offers = results;
      this.sortOffers();
    });
    SearchStore.addObserver('clear', () => {

      this.displayedOffers = [];
      this.offers = [];
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
