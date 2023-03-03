import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4} from "uuid";
import { hash } from "bcryptjs";
import request from 'supertest'
import { app } from "../../../../app";

let connection: Connection

describe("Create User Controller", () => {
  // beforeAll(async () => {
  //   connection = await createConnection()
  //   await connection.runMigrations()

    // const id = uuidV4()
    // const password = await hash('admin',  8)

    // await connection.query(
    //   `INSERT INTO users(id, name, email, password, created_at, updated_at)
    //   value('${id}', 'Wellington', 'damasiowellington7@gmail.com', '${password}', 'now', 'now')`
    // )
  // })

  // afterAll(async () => {
  //   await connection.dropDatabase()
  //   await connection.close()
  // })

  it("Should be able to create a new user", async () => {
    const createUserResponse = await request(app)
      .post('/api/v1/users')
      .send({
        name: "Wellington",
        email: "damasiowellington7@gmail.com",
        password: 'whatever123'
      })

      expect(createUserResponse.status).toBe(201)
  })
})