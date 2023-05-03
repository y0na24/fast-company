import httpService from './http.service'

const userEndPoint = '/user'

const userSerivce = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint)
    return data
  }
}

export default userSerivce
