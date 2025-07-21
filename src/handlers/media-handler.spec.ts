import { CatalogItem } from "../../types"
import { mediaHandlerWrapper } from "./media-handler"

describe("Media handler tests", () => {
  it("should create a media handler", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)
    expect(mediaHandler).toBeDefined()
  })

  it("should save a media and return the Id", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)
    const media = mediaHandler.saveMedia({
      description: "filme do homem aranha",
      genre: "ação",
      title: "homem aranha",
      type: "Serie",
      releaseYear: 2012,
    })
    expect(media).toBeDefined()
    expect(media.id).toBeDefined()
    expect(media.id.length).toEqual(36)
  })

  it("should add saved media to catalogList", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)

    mediaHandler.saveMedia({
      description: "ação",
      genre: "aventura",
      title: "Matrix",
      type: "Movie",
      releaseYear: 1999,
    })

    expect(catalogList.length).toBe(1)
    expect(catalogList[0].title).toBe("Matrix")
  })

  it("should create different IDs for multiple media", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)

    const media1 = mediaHandler.saveMedia({
      description: "desc 1",
      genre: "comédia",
      title: "Title 1",
      type: "Movie",
      releaseYear: 2000,
    })

    const media2 = mediaHandler.saveMedia({
      description: "desc 2",
      genre: "terror",
      title: "Title 2",
      type: "Serie",
      releaseYear: 2010,
    })

    expect(media1.id).not.toBe(media2.id)
  })

  it("should return all saved medias", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)

    mediaHandler.saveMedia({
      description: "media 1",
      genre: "ação",
      title: "M1",
      type: "Movie",
      releaseYear: 2001,
    })

    mediaHandler.saveMedia({
      description: "media 2",
      genre: "drama",
      title: "M2",
      type: "Serie",
      releaseYear: 2005,
    })

    const result = mediaHandler.getMedias()
    expect(result.length).toBe(2)
    expect(result[0].title).toBe("M1")
    expect(result[1].title).toBe("M2")
  })

  it("should return an empty array if no media exists", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)

    const result = mediaHandler.getMedias()
    expect(result).toEqual([])
  })

  it("should return media by valid ID", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)

    const media = mediaHandler.saveMedia({
      description: "desc",
      genre: "ficção",
      title: "Star Wars",
      type: "Movie",
      releaseYear: 1977,
    })

    const found = mediaHandler.getMediaByIdHandler(media.id)
    expect(found).toBeDefined()
    expect(found.title).toBe("Star Wars")
  })

  it("should throw an error if ID not found", () => {
    const catalogList: CatalogItem[] = []
    const mediaHandler = mediaHandlerWrapper(catalogList)

    expect(() => {
      mediaHandler.getMediaByIdHandler("invalid-id")
    }).toThrow("Media not found")
  })
})
