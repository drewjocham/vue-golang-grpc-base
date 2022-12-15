<template>
    <button v-on:click="submit()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        gRPC request
    </button>
    <div class="text-white">
      <div class="grid grid-cols-2 gap-4">
        <div>{{firstName}}</div>
        <div>{{lastName}}</div>
      </div>
    </div>

</template>

<script>
import { ref } from "vue";
import { api } from "../lib/api";

export default {
    name: "Test",

    setup() {

        const firstName = ref('');
        const lastName = ref('');

        const submit = async () => {
            try {
                const response = await api.getTest()

                if (response != null) {
                  firstName.value = response.name
                  lastName.value = response.lastName
                }
            } catch (error) {
                console.log('Error while getting the response:', error)
            }
        }

        return {
          firstName,
          lastName,
          submit
        }
    },

};
</script>

<style scoped>

</style>
