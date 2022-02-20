import { onMounted, ref } from 'vue';
import { loadPokemons, getPokemonOptions } from '../helpers/getOptionPokemons';
import { Pokemon } from '../interfaces/Pokemon';

export const usePokemon = () => {

    const pokemonArr = ref<Pokemon[]>([]);
    const pokemon = ref<Pokemon | null>();
    const showPokemon = ref<boolean>(false);
    const showAnswer = ref<boolean>(false);
    const message = ref<string>('');
    const countRightAnswers = ref<number>(0);
    const messageRightAnswers = ref<string>('');

    const loadPokemonsPage = async () => {

        await loadPokemons()
        mixPokemonsArray()

    }

    const mixPokemonsArray = async () => {

        pokemonArr.value = await getPokemonOptions()

        const rndInt = Math.floor(Math.random() * 4)

        pokemon.value = pokemonArr.value[rndInt]

    }

    const checkAnswer = (selectedId: any) => {

        showPokemon.value = true
        showAnswer.value = true

        if (selectedId === pokemon.value?.id) {
            message.value = `Correcto, ${pokemon.value?.name}`
            countRightAnswers.value += 1;
            messageRightAnswers.value = `${countRightAnswers.value} ${countRightAnswers.value === 1 ? 'correcta' : 'correctas seguidas'}`
        } else {
            message.value = `Oops, era ${pokemon.value?.name}`
            countRightAnswers.value = 0;
            messageRightAnswers.value = ''
        }

    }

    const newGame = async () => {

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
        countRightAnswers,
        messageRightAnswers,

        loadPokemonsPage,
        checkAnswer,
        newGame,
    }

}