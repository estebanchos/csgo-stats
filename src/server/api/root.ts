import { createTRPCRouter } from "~/server/api/trpc";
import { playerRouter } from "./routers/player";

export const appRouter = createTRPCRouter({
  players: playerRouter,
});

export type AppRouter = typeof appRouter;
