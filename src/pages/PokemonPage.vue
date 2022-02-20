<script setup lang="ts">
import PokemonPicture from "../components/PokemonPicture.vue";
import PokemonOptions from "../components/PokemonOptions.vue";
import { usePokemon } from "../composables/usePokemon";

const {
  pokemon,
  showPokemon,
  pokemonArr,
  showAnswer,
  message,
  countRightAnswers,
  messageRightAnswers,

  checkAnswer,
  newGame
} = usePokemon()

</script>

<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button class="btn-success" @click="newGame">Siguiente</button>
    </template>
    <!-- <template v-else>
      <h2 class="correcto" v-if="countRightAnswers !== 0">{{ messageRightAnswers }}</h2>
    </template> -->
  </div>
</template>

<style scoped>
.correcto {
  color: #28a745;
}
</style>
