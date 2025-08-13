import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth.js";

// Ingest batches of metrics samples for a host.
export const ingest = mutation({
  args: {
    host: v.string(),
    samples: v.array(
      v.object({
        ts: v.number(),
        cpuScore: v.optional(v.number()),
        cpuCores: v.optional(v.number()),
        memUsed: v.optional(v.number()),
        memTotal: v.optional(v.number()),
        diskUsed: v.optional(v.number()),
        diskTotal: v.optional(v.number()),
        netDownlink: v.optional(v.number()),
        netRtt: v.optional(v.number()),
        netPingMs: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    let userIdentifier: string | null = null;
    if (userId) userIdentifier = userId as string;
    else {
      const sessionId = await auth.getSessionId(ctx);
      if (sessionId) userIdentifier = sessionId as string;
    }
    if (!userIdentifier) throw new Error("Not authenticated");
    if (args.samples.length > 25) throw new Error("Too many samples");
    for (const s of args.samples) {
      await ctx.db.insert("systemMetrics", {
        userIdentifier,
        host: args.host,
        ts: s.ts,
        cpuScore: s.cpuScore,
        cpuCores: s.cpuCores,
        memUsed: s.memUsed,
        memTotal: s.memTotal,
        diskUsed: s.diskUsed,
        diskTotal: s.diskTotal,
        netDownlink: s.netDownlink,
        netRtt: s.netRtt,
        netPingMs: s.netPingMs,
      });
    }
    return { inserted: args.samples.length };
  },
});

// Tail recent metrics for a host since a timestamp.
export const tail = query({
  args: {
    host: v.string(),
    sinceMs: v.number(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    let userIdentifier: string | null = null;
    if (userId) userIdentifier = userId as string;
    else {
      const sessionId = await auth.getSessionId(ctx);
      if (sessionId) userIdentifier = sessionId as string;
    }
    if (!userIdentifier) throw new Error("Not authenticated");
    const results = await ctx.db
      .query("systemMetrics")
      .withIndex("by_user_host_ts", (q) =>
        q.eq("userIdentifier", userIdentifier).eq("host", args.host)
      )
      .order("desc")
      .take(args.limit);
    return results.filter((r) => r.ts >= args.sinceMs).sort((a, b) => a.ts - b.ts);
  },
});

// Distinct hosts
export const hosts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    let userIdentifier: string | null = null;
    if (userId) userIdentifier = userId as string;
    else {
      const sessionId = await auth.getSessionId(ctx);
      if (sessionId) userIdentifier = sessionId as string;
    }
    if (!userIdentifier) throw new Error("Not authenticated");
    const recent = await ctx.db
      .query("systemMetrics")
      .withIndex("by_user_ts", (q) => q.eq("userIdentifier", userIdentifier))
      .order("desc")
      .take(500);
    const set = new Set<string>();
    for (const r of recent) set.add(r.host);
    return Array.from(set).sort();
  },
});
