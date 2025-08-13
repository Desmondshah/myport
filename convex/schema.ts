import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
	...authTables,
	users: defineTable({
		name: v.string(),
		email: v.string(),
	}),
	systemMetrics: defineTable({
		userIdentifier: v.string(), // from auth identity subject/tokenIdentifier
		host: v.string(), // arbitrary client supplied host label
		ts: v.number(), // epoch ms
		cpuScore: v.optional(v.number()), // synthetic CPU score
		cpuCores: v.optional(v.number()),
		memUsed: v.optional(v.number()), // bytes
		memTotal: v.optional(v.number()), // bytes or estimate
		diskUsed: v.optional(v.number()), // bytes (navigator.storage estimate)
		diskTotal: v.optional(v.number()),
		netDownlink: v.optional(v.number()), // Mbps (navigator.connection.downlink)
		netRtt: v.optional(v.number()), // ms (navigator.connection.rtt or ping)
		netPingMs: v.optional(v.number()), // measured fetch latency
	})
		.index("by_user_host_ts", ["userIdentifier", "host", "ts"])
		.index("by_user_ts", ["userIdentifier", "ts"]),
});
