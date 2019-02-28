import * as Model from '../interface/Model'

class State {

  private host: string
  private token: string
  private userId:string
  // private showTab: boolean

  getItem<T>(name: string) {
    return this[name] as T || null
  }

  setItem<T>(name: string, value: T) {
    this[name] = value
  }

}

export default new State()