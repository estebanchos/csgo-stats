import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const playerRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.players.findMany({
        where: {},
        select: {
          id: true,
          nickname: true,
        }
      });
    }),

  getById: protectedProcedure
    .input(z.object({ playerId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.players.findUnique({
        where: {
          id: input.playerId,
        },
        select: {
          averageKills: true,
          averageDeaths: true,
          averageAssists: true,
          name: true,
          nickname: true,
        }
      })
    }),

  delete: protectedProcedure
    .input(z.object({
      playerId: z.number()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.players.delete({
        where: { id: input.playerId },
      })
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      nickname: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.players.create({
        data: {
          name: input.name,
          nickname: input.nickname,
        },
      })
    }),


});