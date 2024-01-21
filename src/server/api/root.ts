import { createTRPCRouter } from '~/server/api/trpc';
import { playerRouter } from './routers/player';
import { mapRouter } from './routers/map';

export const appRouter = createTRPCRouter({
  players: playerRouter,
  maps: mapRouter,
});

export type AppRouter = typeof appRouter;
