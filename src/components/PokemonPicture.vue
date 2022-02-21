<script setup lang="ts">
import { toRefs, computed } from 'vue';

const props = defineProps({
  pokemonId: {
    type: Number,
    required: true,
  },
  showPokemon: {
    type: Boolean,
    required: true,
    default: false
  },
})

const { pokemonId, showPokemon } = toRefs(props);
const imgSrc = computed(() => (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId.value}.svg`))

</script>

<template>
  <div class="pokemon-container">
    <img v-if="showPokemon" :src="imgSrc" class="fade-in" alt="pokemon" />
    <img v-else :src="imgSrc" class="hidden-pokemon" alt="pokemon" />
  </div>
</template>


<style >
.pokemon-container {
  height: 200px;
}
img { 
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>