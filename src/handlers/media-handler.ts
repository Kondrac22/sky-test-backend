import { randomUUID } from "crypto"
import { CatalogItem, CatalogItemRequest } from "../../types"

export const mediaHandlerWrapper = (catalogList: CatalogItem[]) => {
  const saveMedia = (reqMedia: CatalogItemRequest) => {
    const { title, description, type, releaseYear, genre } = reqMedia

    const media = {
      id: randomUUID(),
      title,
      description,
      type,
      releaseYear,
      genre,
    }

    catalogList.push(media)
    return media
  }
  const getMedias = () => {
    return catalogList
  }

  const getMediaByIdHandler = (mediaId: string) => {
    //checo no servidor se há um item correspondente
    const dbMedia = catalogList.find((media) => {
      return media.id === mediaId
    })
    //se true retorna o item
    if (dbMedia !== undefined) {
      return dbMedia
      //se false retorna erro 404
    } else {
      throw new Error("Media not found")
    }
  }

  return {
    saveMedia,
    getMediaByIdHandler,
    getMedias,
  }
}
