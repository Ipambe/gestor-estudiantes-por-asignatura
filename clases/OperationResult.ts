export class OperationResult<T> {
  private _success: boolean
  private _data: T | null
  private _error: string | null

  constructor(
    success: boolean,
    data: T | null = null,
    error: string | null = null
  ) {
    this._success = success
    this._data = data
    this._error = error
  }

  get success(): boolean {
    return this._success
  }

  get data(): T | null {
    return this._data
  }

  get error(): string | null {
    return this._error
  }
}
