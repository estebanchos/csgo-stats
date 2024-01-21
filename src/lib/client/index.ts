import { type NextRouter } from 'next/router';

export function isCurrentRoute(route: string, router: NextRouter) {
  return router.pathname === route;
}
