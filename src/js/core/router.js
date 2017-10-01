import events from 'core/events';
import HomeSection from 'sections/home/home.jsx';
import { createRouter } from 'modules/network/routing';

const routes = [
  { name: 'home', uri: '/home', data: { component: HomeSection } }
];

const router = createRouter(window, routes);

router.setDefaultRoute('home');

router.onRouteChange((route) => events.notifyObservers('router:update', route));

export default router;
