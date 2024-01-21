import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';

export const playerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        nickname: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.players.create({
        data: {
          name: input.name,
          nickname: input.nickname,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.players.findMany({
      where: {},
      select: {
        id: true,
        nickname: true,
        name: true,
      },
    });
  }),

  getById: protectedProcedure.input(z.object({ playerId: z.number() })).query(({ ctx, input }) => {
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
      },
    });
  }),

  editName: protectedProcedure
    .input(
      z.object({
        playerId: z.number(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.players.update({
        where: { id: input.playerId },
        data: {
          name: input.name,
        },
      });
    }),

  editNickname: protectedProcedure
    .input(
      z.object({
        playerId: z.number(),
        nickname: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.players.update({
        where: { id: input.playerId },
        data: {
          nickname: input.nickname,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        playerId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.players.delete({
        where: { id: input.playerId },
      });
    }),
});
