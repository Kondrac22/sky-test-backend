import z, { ZodLazy } from "zod";
import { randomUUID } from "node:crypto";
import { CatalogItem, FastifyTypeInstance, UserFavorites } from "./types";
import { GetMediaByIdResponseSchema, PostMediaRequestSchema, PostMediaResponseSchema, PostUserFavoriteRequestSchema } from "./schemas";
import { request } from "node:http";

const userFavoritesList : UserFavorites[]= []
const catalogList : CatalogItem[] = []

export async function routes(app: FastifyTypeInstance) {
    app.get('/media', {
        schema: {
            tags: ['Media'],
            description: 'List items on catalog',
            response: {
                200: z.array(PostMediaResponseSchema)
            },
        }
    }, async (request, reply) => {
        return reply.status(200).send(catalogList)
    })

    app.get('/media/:id', {
        schema: {
            tags: ['Media'],
            description: 'Get media by Id',
            params: z.object({
                id: z.string().uuid(),
            }),               
            response: {
                200: GetMediaByIdResponseSchema
            },
        }
    }, async (request, reply) =>{
        
        //vou receber um id
        const mediaId = request.params.id
        //checo no servidor se há um item correspondente
        const dbMedia = catalogList.find((media) => {
            return media.id === mediaId
        })
        //se true retorna o item
        if ( dbMedia !== undefined ){
            return reply.status(200).send(dbMedia)
            //se false retorna erro 404
        } else {            
            return reply.status(404).send()
        }

    })

    app.post('/media',{
        schema: {
            tags: ['Media'],
            description: 'Register a new item on catalog',
            body: PostMediaRequestSchema,
            response: {
                201: PostMediaResponseSchema,
            },
        }
    }, async (request, reply) => {
        const { title, description, type, releaseYear, genre} = request.body
        
        const media = {
            id: randomUUID(),
            title,
            description,
            type,
            releaseYear,
            genre
        }

        catalogList.push(media)

        return reply.status(201).send(media)

    })

    app.post('/users/:userId/favorites', {
        schema: {
            tags: ['Users'],
            description: 'Save Favorite',
            body : PostUserFavoriteRequestSchema,
            params :z.object({
                userId: z.string().uuid(),
            }), 
        }
    }, async(request, reply) =>{
        // obter o userId
        const userId = request.params.userId
        // obter mediaId
        const mediaId = request.body.mediaId
        // checar o db se a media existe
        const dbMedia = catalogList.find((media) => {
            return media.id === mediaId
        })
        // se a media não existir retornar 404
        if (dbMedia === undefined){
            return reply.status(404).send()
        } else {
            const dbUserIdFavoriteList = userFavoritesList.find((user) =>{
                return user.userId === userId
            })
            if (dbUserIdFavoriteList === undefined) {
                userFavoritesList.push({
                    userId: userId,
                    favorites: [mediaId]
                })
                return reply.status(204).send()    
            } else {
                const isAlreadyFavorite = dbUserIdFavoriteList.favorites.find((mediaFav) => {
                    return mediaFav === mediaId
                })
                if(isAlreadyFavorite === undefined) {
                    dbUserIdFavoriteList.favorites.push(mediaId)
                }
                return reply.status(204).send()
            }
           
        //se a media existir adicionar aos favoritos e retornar ok
        
        //buscar preferencias do usuario na lista de usuarios
        //se encontrou usuario na lista 
            //verificar se o favorito ja está na lista do usuario
            //se não estiver add
            //se estiver retornar ok
        //se não encontrou usuario na lista criar um novo usuario e add favorito na lista de usuarios
        //
        }
        

    })

    app.get('/users/:userId/favorites', {
        schema: {
            tags: ['Users'],
            description: 'List user favorite items',
            params: z.object({
                userdId: z.string(),
            }),
            response: {
                200: z.string()
            },
        }
    }, async (request, reply) =>{
        return reply.status(200).send()
    })

   app.delete('/users/:userId/favorites/:mediaId', {
        schema: {
            tags: ['Users'],
            description: 'Remove a media from user favorite list',
            params: z.object({
                userId: z.string(),
                mediaId: z.string(),
            }),
            response: {
                204: z.string(),
            },
        }
    }, async (request, reply) =>{
        return reply.status(200).send()
    })

    
}
