<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">

        <form class="flex items-center space-x-6">
            <div class="shrink-0">
                <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
            </div>
            <label class="block">
                <span class="sr-only">Choose profile photo</span>
                <input type="file" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                          file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
            </label>
        </form>

        <button v-on:click="submit()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
        </button>
        <button v-on:click="counter()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Counter
        </button>
        {{name}}-{{age}}
        env: {{ mode }} - My name: {{ myName}}
    </div>
</template>

<script lang="ts">
import {api} from "@/lib/api";
import {reactive} from "vue";

export default {
    name: "Home",
    setup() {
        const state = reactive({
            name: '',
            age: Number,
            mode: process.env.NODE_ENV,
            myName: process.env.VUE_APP_TITLE
        })

        const submit = async () => {
            try {
                const response = await api.getTest()
                if (response != null) {
                    state.name = JSON.parse(response.getName())
                    state.age = parseInt(JSON.parse(response.getAge()))
                }
            } catch (error) {
                console.log('Error while getting the response:', error)
            }
        }

        return {
            ...state,
            submit
        }
    },

}
</script>

<style scoped>

</style>
