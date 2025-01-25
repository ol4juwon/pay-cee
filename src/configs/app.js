let REST_ENDPOINT
let BASE_URL;
// REST_ENDPOINT = 'http://localhost:4002/api/v1'

REST_ENDPOINT = 'https://payment-test-2hyc.onrender.com/api/v1'

BASE_URL = "https://payment-alva.vercel.app"

const Config = {
  isDev: process.env.NODE_ENV === 'development',
  REST_ENDPOINT,
  BASE_URL
}

export default Config
