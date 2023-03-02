import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { ShowUserProfileError } from "./ShowUserProfileError"
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Display user profile data", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    showUserProfileUseCase =  new ShowUserProfileUseCase(inMemoryUsersRepository)
  })

  it("Should be able to display the profile data of an user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''
    
    const userData = await showUserProfileUseCase.execute(user_id)

    expect(userData).toHaveProperty("id")
    expect(userData).toMatchObject(user)
  })

  it("Should not be able to display the profile data of a non-existent user", () => {
    expect(async () => {
      const nonExistentId = '2231'
      await showUserProfileUseCase.execute(nonExistentId)
    }).rejects.toEqual(new ShowUserProfileError())
  })
})