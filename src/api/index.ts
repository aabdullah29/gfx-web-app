import axios from 'axios'

const DOMAIN = `${process.env.NODE_ENV === 'production' ? '' : 'staging.'}goosefx.io`

const apiClient = (base: string) => {
  return axios.create({
    baseURL: `https://${base}.${DOMAIN}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export default apiClient
