import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Create user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("Should be able to create a new user", async () => { 
    const newUser = await createUserUseCase.execute({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })

    expect(newUser).toHaveProperty('id')
  })

  it("Should not be able to create a new user with the same email as an already existent user", async () => {
    await createUserUseCase.execute({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })

    expect(async () => {
      await createUserUseCase.execute({
        name: "Adriana",
        email: "damasiowellington7@gmail.com",
        password: "adriana123"
      })
    }).rejects.toEqual(new CreateUserError())
  })
})