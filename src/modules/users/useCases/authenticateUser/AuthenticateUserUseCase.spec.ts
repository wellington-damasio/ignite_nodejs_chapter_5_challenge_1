import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError"

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase

describe("Authenticate user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it("Should be able to authenticate an user with a JWT token", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "whatever123"
    })

    const authenticateUser = await authenticateUserUseCase.execute({
      email: "johndoe@gmail.com", 
      password: "whatever123"
    })
    
    expect(authenticateUser).toHaveProperty('token')
    expect(authenticateUser.token).toBeTruthy()
  })

  it("Should not be able to authenticate a non-existent user", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "whatever123"
    })

    await expect(
      authenticateUserUseCase.execute({
        email: "notjohndoe@gmail.com", // incorrect email / user does not exist
        password: "whatever" // correct password
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError())
  })

  it("Should not be able to authenticate user if password passed is wrong", async() => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "whatever123"
    })

    await expect(
      authenticateUserUseCase.execute({
        email: "johndoe@gmail.com", // correct email
        password: "2314" // incorrect password
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError())
  })
})