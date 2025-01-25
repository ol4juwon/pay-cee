let REST_ENDPOINT
let BASE_URL;
REST_ENDPOINT = 'http://localhost:4002/api/v1'

// REST_ENDPOINT = 'https://vend-payout.onrender.com/api/v1'

BASE_URL = "http//localhost:3000"

const Config = {
  isDev: process.env.NODE_ENV === 'development',
  REST_ENDPOINT,
  BASE_URL
}

export default Config
