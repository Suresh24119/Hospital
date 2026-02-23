import axios from './httpRequest'

// Submit contact form
export const createContactMessage = (data: any) => {
  const url = `/contact`
  return axios({ method: 'POST', url, data })
}

// Subscribe to newsletter
export const subscribeNewsletter = (data: any) => {
  const url = `/contact/newsletter`
  return axios({ method: 'POST', url, data })
}
