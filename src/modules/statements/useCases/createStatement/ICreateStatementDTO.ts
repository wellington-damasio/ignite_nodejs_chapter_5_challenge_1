import { Statement } from "../../entities/Statement";

export interface ICreateStatementDTO {
  user_id: string
  description: string
  amount: number
  type: 'withdraw' | 'deposit'
}

