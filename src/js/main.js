import 'core/polyfills';
import events from 'core/events';
import React from 'react';
import ReactDOM from 'react-dom';
import router from 'core/router';
import SVG4Everybody from 'svg4everybody';

console.log('main.js file loaded');
SVG4Everybody();
document.addEventListener('DOMContentLoaded', function() {

  console.log('DOMContentLoaded event callback called');

  events.addObserver('router:update', (route) => {

    const element = React.createElement(route.data.component);
    const container = document.querySelector('#app');

    ReactDOM.render(element, container);
  });

  events.addObserver('section:destroyed', (section) => {

    console.log('section destroyed:', section.getName());
  });

  events.addObserver('section:loaded', (section) => {

    console.log('section loaded:', section.getName());
    SVG4Everybody();
  });

  router.init();
});
