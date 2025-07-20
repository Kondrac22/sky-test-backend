import z from "zod";

export const PostMediaRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["Movie", "Serie"]),
    releaseYear: z.number(),
    genre: z.string()
})
    
export const PostMediaResponseSchema = PostMediaRequestSchema.extend({
    id: z.string()
});

export const mediaIdResponseSchema = PostMediaResponseSchema

export const PostUserFavoriteRequestSchema = z.object({
    mediaId: z.string().uuid(),
})