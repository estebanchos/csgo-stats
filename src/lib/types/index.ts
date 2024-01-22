import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from '~/server/api/root';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type TPlayers = RouterOutput['players']['getAll'];

export type TPlayerById = RouterOutput['players']['getById'];
