import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

/**
 * Minimal tRPC router - Frontend uses FastAPI backend at https://api.echofort.ai
 * This router only handles auth for the Manus OAuth system
 */

export const appRouter = router({
  system: systemRouter,

  // AI Pending Actions Proxy
  aiProxy: router({    getPendingActions: publicProcedure.query(async (opts) => {
      // DEBUG: Return request info
      const debugInfo = {
        requestReceived: true,
        timestamp: new Date().toISOString(),
        contextExists: !!opts.ctx,
      };
      try {
        const response = await fetch('https://api.echofort.ai/api/ai-execution/pending-actions', {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });
        if (!response.ok) throw new Error(`Backend returned ${response.status}`);
        const data = await response.json();
        return { ...data, _debug: debugInfo };
      } catch (error: any) {
        console.error('[Proxy] Error fetching AI pending actions:', error);
        return { actions: [], count: 0, error: error.message, _debug: debugInfo };
      }
    }),
    approveAction: publicProcedure
      .input(z.object({ action_id: z.number(), approved: z.boolean() }))
      .mutation(async ({ input }) => {
        try {
          const response = await fetch('https://api.echofort.ai/api/ai-execution/approve-action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(input),
          });
          if (!response.ok) throw new Error(`Backend returned ${response.status}`);
          return await response.json();
        } catch (error: any) {
          console.error('[Proxy] Error approving AI action:', error);
          return { status: 'error', message: error.message };
        }
      }),
  }),

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;

