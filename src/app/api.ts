const API_URL = 'https://prsevero.com.br/countries/'

export function getCountries (): Promise<Response> {
  return fetch(API_URL)
}
