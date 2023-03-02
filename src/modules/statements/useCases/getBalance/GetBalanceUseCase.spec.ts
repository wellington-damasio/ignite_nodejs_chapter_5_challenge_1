import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { GetBalanceError } from "./GetBalanceError"
import { GetBalanceUseCase } from "./GetBalanceUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository
let getBalanceUseCase: GetBalanceUseCase

describe("Display user balance data", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository, 
      inMemoryUsersRepository
    )
  })
  it("Should be able to display the balance in an user's account", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''

    const userBalance = await getBalanceUseCase.execute({user_id})

    expect(userBalance).toHaveProperty('balance')
  })

  it("Should not be able to display the balance of a non-existent user",async () => {
    const nonExistentUserId = '2314'

    await expect(getBalanceUseCase.execute({user_id: nonExistentUserId}))
      .rejects.toEqual(new GetBalanceError())
  })
})