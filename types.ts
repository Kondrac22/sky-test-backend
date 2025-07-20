import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypeInstance = FastifyInstance<
    RawServerDefault, //;para não mexer no servidor do fastify
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>

export interface CatalogItem {
    id: string
    title: string
    description: string
    type: "Movie" | "Serie"
    releaseYear: number
    genre: string
}

export interface UserFavorites{
    userId: string
    favorites: string[]
}