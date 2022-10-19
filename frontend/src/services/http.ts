import Axios, { AxiosResponse } from 'axios'

const http = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject({
      statusCode: error.response.status,
      errors: error.response.data,
    })
  }
)

export default http