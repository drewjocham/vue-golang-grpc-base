<template>
    <button v-on:click="submit()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
    </button>
    <div class="text-white">
       <div>
           Request from backend
       </div>
        Name: {{username}} Age {{age}}
    </div>

</template>

<script>
import { ref } from "vue";
import { api } from "../lib/api";

export default {
    name: "Test",

    setup() {

        const username = ref('');
        const age = ref('');

        const submit = async () => {
            try {
                const response = await api.getTest()

                if (response != null) {
                    username.value = response.name
                    age.value = response.age
                }
            } catch (error) {
                console.log('Error while getting the response:', error)
            }
        }

        return {
            username,
            age,
            submit
        }
    },

};
</script>

<style scoped>

</style>
