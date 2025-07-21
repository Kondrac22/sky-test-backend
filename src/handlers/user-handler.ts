import { CatalogItem, UserFavorites } from "../../types"

const createFavUserList = (media: CatalogItem): CatalogItem => {
  return {
    id: media.id,
    title: media.title,
    description: media.description,
    type: media.type,
    releaseYear: media.releaseYear,
    genre: media.genre,
  }
}

export const userHandlerWrapper = (
  catalogList: CatalogItem[],
  userFavoritesList: UserFavorites[],
) => {
  const saveFavoriteHandler = (userId: string, mediaId: string) => {
    const dbMedia = catalogList.find((media) => {
      return media.id === mediaId
    })
    // se a media não existir retornar 404
    if (dbMedia === undefined) {
      throw new Error("Media not found")
    } else {
      // verificar se o id está na lista
      const dbUserIdFavoriteList = userFavoritesList.find((user) => {
        return user.userId === userId
      }) // se não estiver na lista, incluir userId e media nos favoritos
      if (dbUserIdFavoriteList === undefined) {
        userFavoritesList.push({
          userId: userId,
          favorites: [createFavUserList(dbMedia)],
        })
      } else {
        //verificar se a media está na lista
        const isAlreadyFavorite = dbUserIdFavoriteList.favorites.find((fav) => {
          return fav.id === mediaId
        }) //se não entao adicionar
        if (isAlreadyFavorite === undefined) {
          dbUserIdFavoriteList.favorites.push(createFavUserList(dbMedia))
        }
      }
    }
  }

  const getUserFavoritesListHandler = (userId: string) => {
    //receber o userId
    const dbUserIdFavoriteList = userFavoritesList.find((userFavList) => {
      return userFavList.userId === userId
    })
    return dbUserIdFavoriteList?.favorites || []
  }

  const deleteMediaHandler = (userId: string, mediaId: string) => {
    const dbUserIdFavoritesList = userFavoritesList.find((userFavList) => {
      return userFavList.userId === userId
    })
    if (!dbUserIdFavoritesList) {
      throw new Error("User no found")
    }
    const mediaIndex = dbUserIdFavoritesList.favorites.findIndex((media) => {
      return media.id === mediaId
    })
    if (mediaIndex === -1) {
      throw new Error("Media no found")
    }
    dbUserIdFavoritesList.favorites.splice(mediaIndex, 1)
  }
  return {
    saveFavoriteHandler,
    getUserFavoritesListHandler,
    deleteMediaHandler,
  }
}
