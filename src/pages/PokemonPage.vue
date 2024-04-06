<script setup lang="ts">
import { PokemonPicture, PokemonOptions } from "../components";
import { usePokemon } from "../composables";

import Swal from 'sweetalert2'
import { useUserScore } from '../stores/score'
import { useRouter } from "vue-router";

const {
  pokemon,
  showPokemon,
  pokemonArr,
  showAnswer,
  message,
  messageRightAnswers,

  checkAnswer,
  newGame
} = usePokemon()

const userScore = useUserScore();

const router = useRouter()

const changeName = async () => {
  Swal.fire({
    title: '¿Qué apodo deseas?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Cambiar',
  }).then((result) => {
    if (result.isConfirmed) {
      if(result.value!==''){
        userScore.userName = result.value
      }
    }
  })
}

const goTableScore = () => {
  router.push({ name: 'Score' })
  userScore.respondido = false
}

</script>

<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <div>
      <span class="username">{{userScore.userName}}&#160;</span>
      <button class="btn-info" @click="changeName">Cambiar Apodo</button>
    </div>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
    <template v-if="showAnswer">
      <h2 class="fade-in" :class="[ userScore.badAnswer?'bad-answer':'' ]">{{ message }}</h2>
      <button class="btn-success" @click="newGame">{{userScore.badAnswer ? "Nuevo Juego" : "Siguiente"}}</button>
      <span v-if="userScore.badAnswer">
        &nbsp;
      </span>
      <button v-if="userScore.badAnswer" class="btn-success" @click="goTableScore">Ver tabla</button>  
    </template>
    <template v-else>
      <h2 class="correcto" v-if="userScore.score !== 0">{{ messageRightAnswers }}</h2>
    </template>
  </div>
</template>

<style scoped>
.correcto {
  color: #28a745;
}

.input {
  padding-top: 3px;
  padding-bottom: 3px;
}

.bad-answer{
  color: #e61717;
}

</style>
