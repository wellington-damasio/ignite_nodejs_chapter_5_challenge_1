import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { CreateStatementError } from "./CreateStatementError"
import { CreateStatementUseCase } from "./CreateStatementUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository
let createStatementUseCase: CreateStatementUseCase

describe("Create deposit statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    )
  })

  it("Should be able to generate a new deposit or withdraw statement for an user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''

    const newDepositStatement = await createStatementUseCase.execute({
      user_id,
      description: "salary",
      amount: 4560,
      type: "deposit"
    })

    const newWithdrawStatement = await createStatementUseCase.execute({
      user_id,
      description: "Rear wing for the Civic :)",
      amount: 980,
      type: "withdraw"
    })

    expect(newDepositStatement).toHaveProperty("id")
    expect(newWithdrawStatement).toHaveProperty("id")
  })

  it("Should not be able to generate a new statement for a non-existent user", async () => {
    const nonExistentUserId = '1231asqw23'

    await expect(
      createStatementUseCase.execute({
        user_id: nonExistentUserId,
        description: "Freelance project: Ferramenta de Gestão de Orçamentos para Obras",
        amount: 3267,
        type: "deposit"
      })
    ).rejects.toEqual(new CreateStatementError.UserNotFound())
  })

  it("Should not be able to generate a new withdraw statement if user doesn't have sufficient funds", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''

    // User has balance = 0 by default

    await expect(
      createStatementUseCase.execute({
        user_id,
        description: 'Chocolate',
        amount: 6.70,
        type: 'withdraw'
      })
    ).rejects.toEqual(new CreateStatementError.InsufficientFunds())
  })
})