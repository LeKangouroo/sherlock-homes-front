import 'core/polyfills';
import router from 'core/router';
import events from 'core/events';
import homeSection from 'sections/home/home.vue';
import SVG4Everybody from 'svg4everybody';
import Vue from 'vue';

SVG4Everybody();
document.addEventListener('DOMContentLoaded', function() {

  new Vue({

    el: '#app',
    data: {
      currentSection: null,
      isLoading: true
    },
    components: {
      homeSection
    },
    mounted() {

      events.addObserver('section:destroyed', () => {

        this.isLoading = true;
      });

      events.addObserver('section:loaded', () => {

        this.isLoading = false;
        SVG4Everybody();
      });

      events.addObserver('router:update', (route) => {

        this.currentSection = `${route.name}-section`;
      });

      router.init();
    }
  });
});
