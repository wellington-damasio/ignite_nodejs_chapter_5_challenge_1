import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { GetStatementOperationError } from "./GetStatementOperationError"
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository
let getStatementOperationUseCase: GetStatementOperationUseCase

describe("Display user's statement operation", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository, 
      inMemoryStatementsRepository
    )
  })

  it("Should be able to display user's operation statement", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''

    const newStatement = await inMemoryStatementsRepository.create({
      user_id,
      amount: 1200,
      description: 'salary',
      type: 'deposit'
    })
    const newStatementId = newStatement.id ? newStatement.id : ''

    const getStatementOperationResult = await getStatementOperationUseCase.execute({
      user_id,
      statement_id: newStatementId
    })

    expect(getStatementOperationResult).toMatchObject(newStatement)
  })

  it("Should not be able to display the operation statement of a non-existent user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''
    const nonExistentUserId = '2134'

    const statement = await inMemoryStatementsRepository.create({
      user_id,
      description: 'salary',
      amount: 3760,
      type: 'deposit'
    })
    const statement_id = statement.id ? statement.id : ''
    
    await expect(
      getStatementOperationUseCase.execute({
        user_id: nonExistentUserId,
        statement_id
      })
    ).rejects.toEqual(new GetStatementOperationError.UserNotFound())
  })

  it("Should not be able to display a non-existent operation statement", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Wellington",
      email: "damasiowellington7@gmail.com",
      password: "whatever123"
    })
    const user_id = user.id ? user.id : ''
    const nonExistentStatementId = '2134'
    
    await expect(
      getStatementOperationUseCase.execute({
        user_id,
        statement_id: nonExistentStatementId
      })
    ).rejects.toEqual(new GetStatementOperationError.StatementNotFound())
  })
})