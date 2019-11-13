// in HTTP.js
import axios from 'axios'
import NProgress from 'nprogress'

// create a new axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004'
})

// before a request is made start the nprogress
axiosInstance.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
axiosInstance.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default axiosInstance
