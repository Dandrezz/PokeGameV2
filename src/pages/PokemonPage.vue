<script setup lang="ts">
import { watch, ref } from 'vue';
import { PokemonPicture, PokemonOptions } from "../components";
import { usePokemon, useModal } from "../composables";
import Modal from '../components/Modal.vue';

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

const {
  isOpen,
  closeModal,
  openModal
} = useModal()

const score = ref<string>('')

watch(
  countRightAnswers,
  (countRightAnswers, prevcountRightAnswers) => {
    if (prevcountRightAnswers !== 0 && countRightAnswers == 0) openModal()
  }
)

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
    <template v-else>
      <h2 class="correcto" v-if="countRightAnswers !== 0">{{ messageRightAnswers }}</h2>
    </template>
  </div>
  <Modal v-if="isOpen" @on:close="closeModal">
    <template v-slot:header>
      <h2>Fin de partida</h2>
    </template>

    <template v-slot:body>
      <div>¿Desea guardar su score?</div>
      <div>Inserte usuario</div>
      <input v-model="score" type="text" class="mt-5" />
      <br />
    </template>

    <template v-slot:footer>
      <div class="mt-5">
        <button class="btn-success">Guardar</button>
        &#160;
        <button class="btn-danger" @click="closeModal">Cancelar</button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.correcto {
  color: #28a745;
}

.input {
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
