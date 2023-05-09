const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

export const setTokens = ({ refreshToken, idToken, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getResfreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}

export const getTokenExipiresDate = () => {
  return localStorage.getItem(EXPIRES_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getResfreshToken,
  getTokenExipiresDate
}

export default localStorageService
