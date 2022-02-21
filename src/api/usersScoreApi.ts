import axios from 'axios'

const usersScoreApi = axios.create({
    baseURL: 'https://pokemon-game-guess.herokuapp.com'
})

export default usersScoreApi