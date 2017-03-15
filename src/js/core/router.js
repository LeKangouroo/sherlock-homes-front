import events from 'core/events';
import Router from 'classes/router';

const router = new Router(
  [
    { name: 'home', uri: '/home' }
  ],
  window.location
);

router.setDefaultRoute('home');
router.onRouteChange((route) => events.notifyObservers('router:update', route));

export default router;
