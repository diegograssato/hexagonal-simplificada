import HttpStatusCode from "src/infra/http/middleware/HttpStatusCode"

export class DefaultError extends Error {
  message: string
  data?: object
  status?: number
  statusCode?: number

  constructor (message: string, data?: object) {
    super(message)
    this.message = message
    this.data = data
  }
}
