import { onMounted, ref } from 'vue';
import { loadPokemons, getPokemonOptions } from '../helpers/getOptionPokemons';
import { Pokemon } from '../interfaces/Pokemon';
import { useUserScore } from '../stores/score';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { usersScoreApi } from '../api';

export const usePokemon = () => {

    const pokemonArr = ref<Pokemon[]>([]);
    const pokemon = ref<Pokemon | null>();
    const showPokemon = ref<boolean>(false);
    const showAnswer = ref<boolean>(false);
    const message = ref<string>('');
    const messageRightAnswers = ref<string>('');
    

    const userScore = useUserScore();

    const loadPokemonsPage = async () => {

        await loadPokemons()
        mixPokemonsArray()

    }

    const mixPokemonsArray = async () => {
        pokemonArr.value = await getPokemonOptions()
        const rndInt = Math.floor(Math.random() * 4)
        pokemon.value = pokemonArr.value[rndInt]
    }

    const checkAnswer = async (selectedId: any) => {

        if(userScore.respondido) return
        userScore.respondido = true
        showPokemon.value = true
        showAnswer.value = true

        if (selectedId === pokemon.value?.id) {
            userScore.removePokemo(selectedId)
            message.value = `Correcto, ${pokemon.value?.name}`
            userScore.score += 1;
            messageRightAnswers.value = `${userScore.score} ${userScore.score === 1 ? 'correcta' : 'correctas seguidas'}`
        } else {
            userScore.badAnswer = true
            if (userScore.score !== 0) {
                if(userScore.userId === ''){
                    try {
                        const userResponse = await usersScoreApi.post('/user',{
                            name:userScore.userName,
                            score:userScore.score
                        })
                        userScore.userId = userResponse.data.data.InsertedID
                        userScore.maxScore = userScore.score
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    if(userScore.maxScore<userScore.score){
                        try {
                            await usersScoreApi.put(`/user/${userScore.userId}`,{
                                name:userScore.userName,
                                score:userScore.score
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
            message.value = `Oops, era ${pokemon.value?.name}`
            userScore.score = 0;
            messageRightAnswers.value = ''
        }
    }

    const newGame = async () => {

        userScore.respondido = false
        userScore.badAnswer = false
        message.value = ""
        showPokemon.value = false
        showAnswer.value = false
        pokemonArr.value = []
        pokemon.value = null

        mixPokemonsArray()

    }

    onMounted(() => {
        loadPokemonsPage();
    });

    return {
        pokemonArr,
        pokemon,
        showPokemon,
        showAnswer,
        message,
        messageRightAnswers,

        loadPokemonsPage,
        checkAnswer,
        newGame,
    }

}