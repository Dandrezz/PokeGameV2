import { defineStore } from 'pinia';
import { getPokemons } from '../helpers/getOptionPokemons';

export const useUserScore = defineStore('userScore', {

    state: () => ({
        score: 0,
        userName: 'PandaAnonimo'+Math.floor(Math.random() * 1000),
        userId: '',
        maxScore: 0,
        pokemonsArr: getPokemons()
    }),
    
    actions:{
        removePokemo(idPokemon:number){
            this.pokemonsArr = this.pokemonsArr.filter(pokemonId=>pokemonId!==idPokemon)
        },
        initValues(){
            this.score = 0
            this.pokemonsArr = getPokemons()
        }
    }
})
