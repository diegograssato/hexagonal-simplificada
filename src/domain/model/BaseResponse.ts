
export class MetaResponse {
  requestTime: Date
  correlationId: string
  totalRecords?: number
  totalPages?: number 

  constructor(requestTime = new Date(), totalRecords?: number, totalPages?: number) {
    this.requestTime = requestTime
    this.totalRecords = totalRecords
    this.totalPages = totalPages
  }
}
export class BaseResponse {
  status: number
  errors: boolean
  message: string
  data: object
  meta?: MetaResponse

  constructor(status: number, message: string, data: object, errors = false, meta = new MetaResponse()) {
    this.status = status
    this.errors = errors
    this.message = message
    this.data = data
    this.meta = meta
  }
}
