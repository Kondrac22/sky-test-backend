import { CatalogItem, FastifyTypeInstance, UserFavorites } from "../../types"
import {
  DeleteUserFavoriteMediaSchema,
  GetMediaByIdSchema,
  GetMediasSchema,
  GetUserFavoritesListSchema,
  PostMediaSchema,
  PostSaveFavoriteSchema,
} from "../../schemas"
import { userHandlerWrapper, mediaHandlerWrapper } from "../handlers"

const userFavoritesList: UserFavorites[] = []
const catalogList: CatalogItem[] = []

export async function routes(app: FastifyTypeInstance) {
  const mediaHandler = mediaHandlerWrapper(catalogList)

  const userHandler = userHandlerWrapper(catalogList, userFavoritesList)

  app.post("/media", PostMediaSchema, async (request, reply) => {
    const media = mediaHandler.saveMedia(request.body)
    return reply.status(201).send(media)
  })
  app.get("/media", GetMediasSchema, async (_request, reply) => {
    const list = mediaHandler.getMedias()
    return reply.status(200).send(list)
  })
  app.get("/media/:id", GetMediaByIdSchema, async (request, reply) => {
    try {
      const media = mediaHandler.getMediaByIdHandler(request.params.id)
      return reply.status(200).send(media)
    } catch (error) {
      console.log("Error on getMediaById", error)
      return reply.status(404).send() //Error defalut
    }
  })

  app.post(
    "/users/:userId/favorites",
    PostSaveFavoriteSchema,
    async (request, reply) => {
      try {
        userHandler.saveFavoriteHandler(
          request.params.userId,
          request.body.mediaId,
        )
        return reply.status(204).send()
      } catch (error) {
        console.log("Error on save favorite", error)
        return reply.status(404).send() //Error defalut
      }
    },
  )

  app.get(
    "/users/:userId/favorites",
    GetUserFavoritesListSchema,
    async (request, reply) => {
      const userFavoriteList = userHandler.getUserFavoritesListHandler(
        request.params.userId,
      )
      return reply.status(200).send(userFavoriteList)
    },
  )

  app.delete(
    "/users/:userId/favorites/:mediaId",
    DeleteUserFavoriteMediaSchema,
    async (request, reply) => {
      try {
        userHandler.deleteMediaHandler(
          request.params.userId,
          request.params.mediaId,
        )
        return reply.status(204).send()
      } catch {
        return reply.status(404).send()
      }
    },
  )
}
