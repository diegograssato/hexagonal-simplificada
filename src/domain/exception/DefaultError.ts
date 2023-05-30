export class DefaultError extends Error {
  message: string
  data?: object

  constructor (message: string, data?: object) {
    super(message)
    this.message = message
    this.data = data
  }
}
