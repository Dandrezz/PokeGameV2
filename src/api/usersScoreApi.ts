import axios from 'axios'

const usersScoreApi = axios.create({
    baseURL: 'https://poke-api-hono.diegoaporterol.workers.dev/api'
})

export default usersScoreApi