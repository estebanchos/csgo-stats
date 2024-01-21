// import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

export const mapRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.maps.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        isDefusal: true,
      },
    });
  }),
});
