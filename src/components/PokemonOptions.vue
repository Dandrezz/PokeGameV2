<script setup lang="ts">

import { toRefs } from 'vue';
import { Pokemon } from '../interfaces/Pokemon'
import { useUserScore } from '../stores/score';

interface Props {
    pokemons: Pokemon[];
}

const props = defineProps<Props>()
const { pokemons } = toRefs(props);

const userScore = useUserScore();

</script>

<template>
    <div class="options-container">
        <ul>
            <li
                :class="[userScore.respondido ? 'disable-li' : '' ]"
                v-for="pokemon in pokemons"
                :key="pokemon.id"
                @click="$emit('selection', pokemon.id)"
            >{{ pokemon.name }}</li>
        </ul>
    </div>
</template>


<style>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding-top: 3px;
    padding-bottom: 3px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}

.disable-li{
    background-color: rgba(0, 0, 0, 0.05);
}
</style>