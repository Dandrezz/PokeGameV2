<script setup lang="ts">
import { AxiosResponse } from 'axios';
import { onMounted, ref } from 'vue';
import { usersScoreApi } from '../api';
import { UserResponse } from '../interfaces/UserResponse'

const users = ref()

onMounted(async () => {
    const { data } = await usersScoreApi.get<AxiosResponse<UserResponse>>('/users/top')
    users.value = data.data
    console.log(users.value)
})

</script>

<template>
    <h1>Top de Jugadores</h1>
    <ul v-if="users">
        <li v-for="user in users" :key="user.id">
            <h3>
                {{ user.name }}
                <span class="score">{{ user.score }}</span>
            </h3>
        </li>
    </ul>
    <button class="btn-success mb-3" @click="$router.back">Regresar</button>
</template>

<style scoped>
li {
    padding-top: 3px;
    padding-bottom: 3px;
    background-color: transparent;
    border-radius: 5px;
    border: 0px;
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
    margin-left: auto;
    margin-right: auto;
}
.score {
    color: #218838;
}
h3 {
    font-weight: normal;
}
</style>