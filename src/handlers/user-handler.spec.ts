import { CatalogItem, UserFavorites } from "../../types"
import { userHandlerWrapper } from "./user-handler"

describe("User handler tests", () => {
  it("should create a favorite list", () => {
    const catalogList: CatalogItem[] = [
      {
        title: "homen de ferro",
        description: "filme do homem de ferro",
        type: "Movie",
        releaseYear: 3232,
        genre: "ação",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      },
    ]
    const userFavoritesList: UserFavorites[] = []
    const userHandler = userHandlerWrapper(catalogList, userFavoritesList)
    userHandler.saveFavoriteHandler(
      "6b07d2a0-75dd-47fc-a6bb-b1b8d35f3f31",
      "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    )
    expect(userFavoritesList).toHaveLength(1)
  })

  it("should return a user favorite list", () => {
    const catalogList: CatalogItem[] = [
      {
        title: "homen de ferro",
        description: "filme do homem de ferro",
        type: "Movie",
        releaseYear: 3232,
        genre: "ação",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      },
    ]
    const userFavoritesList: UserFavorites[] = [
      {
        userId: "user-123",
        favorites: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
            title: "homen de ferro",
            description: "filme do homem de ferro",
            type: "Movie",
            releaseYear: 3232,
            genre: "ação",
          },
        ],
      },
    ]
    const userHandler = userHandlerWrapper(catalogList, userFavoritesList)
    const favList = userHandler.getUserFavoritesListHandler("user-123")
    expect(Array.isArray(favList)).toBe(true)
    expect(favList[0].id).toBe("3fa85f64-5717-4562-b3fc-2c963f66afa5")
  })

  it("should delete a media from user favorite list", () => {
    const catalogList: CatalogItem[] = [
      {
        description: "Filme do homem de ferro salvando o mundo",
        genre: "Ação",
        releaseYear: 2010,
        title: "homem de ferro",
        type: "Movie",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      },
    ]
    const userFavoritesList: UserFavorites[] = [
      {
        userId: "user-123",
        favorites: [
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
            title: "homen de ferro",
            description: "filme do homem de ferro",
            type: "Movie",
            releaseYear: 3232,
            genre: "ação",
          },
        ],
      },
    ]
    const userHandler = userHandlerWrapper(catalogList, userFavoritesList)
    userHandler.deleteMediaHandler(
      "user-123",
      "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    )
    expect(userFavoritesList[0].favorites).toHaveLength(0)
  })

  it("should not add duplicate media to favorites", () => {
    const catalogList: CatalogItem[] = [
      {
        id: "media-123",
        title: "homem aranha",
        type: "Movie",
        description: "Filme do homem aranha salvando o mundo",
        releaseYear: 2014,
        genre: "ação",
      },
    ]

    const userFavoritesList: UserFavorites[] = [
      {
        userId: "user-123",
        favorites: [
          {
            id: "media-123",
            title: "homem de ferro",
            type: "Movie",
            description: "Filme do homem de ferro salvando o mundo",
            releaseYear: 2014,
            genre: "Ação",
          },
        ],
      },
    ]

    const userHandler = userHandlerWrapper(catalogList, userFavoritesList)

    // Tenta adicionar o mesmo item novamente
    userHandler.saveFavoriteHandler("user-123", "media-123")

    // Verifica que não foi adicionado duplicado
    expect(userFavoritesList[0].favorites).toHaveLength(1)
  })

  it("should add multiple media items to user favorites", () => {
    const catalogList: CatalogItem[] = [
      {
        description: "Filme do homem de ferro salvando o mundo",
        genre: "Ação",
        releaseYear: 2010,
        title: "homem de ferro",
        type: "Movie",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      },
      {
        description: "Filme do homem de aranha salvando o mundo",
        genre: "Ação",
        releaseYear: 2011,
        title: "homem aranha",
        type: "Movie",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },
    ]

    const userFavoritesList: UserFavorites[] = [
      {
        userId: "user-123",
        favorites: [],
      },
    ]

    const userHandler = userHandlerWrapper(catalogList, userFavoritesList)

    userHandler.saveFavoriteHandler(
      "user-123",
      "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    )
    userHandler.saveFavoriteHandler(
      "user-123",
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    )

    expect(userFavoritesList[0].favorites).toHaveLength(2)
    expect(userFavoritesList[0].favorites.map((m) => m.id)).toEqual([
      "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    ])
  })
})
