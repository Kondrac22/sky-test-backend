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

export const PostMediaSchema = {
    schema: {
        tags: ['Media'],
        description: 'Register a new item on catalog',
        body: PostMediaRequestSchema,
        response: {
            201: PostMediaResponseSchema,
        },
    }
}

export const GetMediasSchema = {
    schema: {
        tags: ['Media'],
        description: 'List items on catalog',
        response: {
            200: z.array(PostMediaResponseSchema)
        },
    }
}

export const GetMediaByIdSchema = {
    schema: {
        tags: ['Media'],
        description: 'Get media by Id',
        params: z.object({
            id: z.string().uuid(),
        }),
        response: {
            200: mediaIdResponseSchema
        },
    }
}

export const PostSaveFavoriteSchema = {
    schema: {
        tags: ['Users'],
        description: 'Save Favorite',
        body: PostUserFavoriteRequestSchema,
        params: z.object({
            userId: z.string().uuid(),
        }),
    }
}

export const GetUserFavoritesListSchema = {
    schema: {
        tags: ['Users'],
        description: 'List user favorite items',
        params: z.object({
            userId: z.string(),
        }),
        response: {
            200: z.array(mediaIdResponseSchema)
        },
    }
}

export const DeleteUserFavoriteMediaSchema = {
    schema: {
        tags: ['Users'],
        description: 'Remove a media from user favorite list',
        params: z.object({
            userId: z.string(),
            mediaId: z.string(),
        }),
        response: {
            204: z.string(),
            404: z.string(),
        },
    }
}