// import { TRPCError } from '@trpc/server'
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "./init";

import type { FeatureCollection } from "geojson";

const coordinatesSchema = z.tuple([z.number(), z.number()]);

// Helper function that returns a valid fetch url
const getValidUrl = (location: string) => {
	return `https://data.api.xweather.com/lightning/flash/${location}?format=geojson&radius=20&minradius=0mi&limit=50&client_id=${env.XWEATHER_CLIENT_ID}&client_secret=${env.XWEATHER_CLIENT_SECRET}`
}

const lightningRouter = {
	// Lightning strikes in the past 5 minutes by coordinates
	coordinates: publicProcedure.input(z.object({
		coordinates: coordinatesSchema,
	})).query(async ({ input }) => {
		const [long, lat] = input.coordinates;

		const strikes = await fetch(getValidUrl(`${long},${lat}`))
			.then((r) => {
				if (r.status === 404) {
					throw new TRPCError({ code: 'NOT_FOUND'})
				}

				return r.json() as Promise<FeatureCollection>
			})
		
		return strikes.features;
	}),

	// Lightning strikes in the past 5 minutes by zipcode
	zipcode: publicProcedure.input(z.object({
		zipcode: z.string(),
	})).query(async ({ input }) => {
		const { zipcode } = input;

		const strikes = await fetch(getValidUrl(`${zipcode}`))
			.then((r) => {
				if (r.status === 404) {
					throw new TRPCError({ code: 'NOT_FOUND'})
				}

				return r.json() as Promise<FeatureCollection>
			})

		return strikes.features;
	}),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
	lightning: lightningRouter,
})

export type TRPCRouter = typeof trpcRouter;
