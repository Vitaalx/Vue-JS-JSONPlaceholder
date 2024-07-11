import { z } from "zod";

export const photoSchema = z.object({
    albumId: z.number(),
    id: z.number(),
    title: z.string(),
    url: z.string(),
    thumbnailUrl: z.string()
});

export const photoCollectionSchema = photoSchema.array();