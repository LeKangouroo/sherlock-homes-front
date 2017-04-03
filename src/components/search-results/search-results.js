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
  mounted() {

    console.log('search-results component mounted');
    SearchStore.addObserver('results:update', (results) => {

      this.offers = results;
      this.sortOffers();
    });
    SearchStore.addObserver('clear', () => {

      debugger;

      this.displayedOffers = [];
      this.offers = [];

      debugger;
    });
  },
  methods: {

    onHeadCellClick(name)
    {
      this.sortKey = name;
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
      this.sortOffers();
    },
    sortOffers()
    {
      this.displayedOffers = orderBy(this.offers, [this.sortKey], [this.sortOrder]);
    }
  }
};
