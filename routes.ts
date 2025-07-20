import z, { ZodLazy } from "zod";
import { randomUUID } from "node:crypto";
import { CatalogItem, CreateFavUserList, FastifyTypeInstance, FavoriteItem, UserFavorites } from "./types";
import { mediaIdResponseSchema, PostMediaRequestSchema, PostMediaResponseSchema, PostUserFavoriteRequestSchema } from "./schemas";

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
                200: mediaIdResponseSchema
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
            // verificar se o id está na lista
            const dbUserIdFavoriteList = userFavoritesList.find((user) =>{
                return user.userId === userId
            }) // se não estiver na lista, incluir userId e media nos favoritos
            if (dbUserIdFavoriteList === undefined) {
                userFavoritesList.push({
                    userId: userId,
                    favorites: [CreateFavUserList(dbMedia)]
                })
                return reply.status(204).send()    
            } else { //verificar se a media está na lista 
                const isAlreadyFavorite = dbUserIdFavoriteList.favorites.find((fav) => {
                    return fav.id === mediaId;
                }) //se não entao adicionar
                if(isAlreadyFavorite === undefined) {
                    dbUserIdFavoriteList.favorites.push(CreateFavUserList(dbMedia))
                }
                return reply.status(204).send()
            }
        }
    })
    app.get('/users/:userId/favorites', {
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
    }, async (request, reply) =>{
        //receber o userId
        const userId = request.params.userId
        const dbUserIdFavoriteList = userFavoritesList.find((userFavList) => {
            return userFavList.userId === userId        
        });
        return reply.status(200).send(dbUserIdFavoriteList?.favorites || [] );
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
                404: z.string(),
            },
        }
    }, async (request, reply) =>{
        const userId = request.params.userId
        const mediaId = request.params.mediaId
        const dbUserIdFavoritesList = userFavoritesList.find((userFavList) =>{
            return userFavList.userId === userId
        })
        if (!dbUserIdFavoritesList){
            return reply.status(404).send('User not found')
        }
        const mediaIndex = dbUserIdFavoritesList.favorites.findIndex((media) => {
            return media.id === mediaId
        })
        if (mediaIndex === -1) {
            return reply.status(400).send('Media not found')
        }
        dbUserIdFavoritesList.favorites.splice(mediaIndex, 1)
            return reply.status(200).send()
    })
   
}


