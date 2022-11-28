<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

      <form class="flex items-center space-x-6">
          <div class="shrink-0">
              <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
          </div>
          <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
          </label>
      </form>

      <button v-on:click="submit()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button
      </button>
      <button v-on:click="counter()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Counter
      </button>
      {{name}}-{{age}}


  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';
import {api} from "@/lib/api"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

    name = ""
    age = 25

    submit(): void {
        api.getTest().then(
            response => {
                const testResponse = JSON.stringify(response)
                this.name = JSON.parse(testResponse).name
                this.age = parseInt(JSON.parse(testResponse).age)
        }).catch(response => {
            console.log("Error while getting the response", response)
        })
    }

    counter(): void {
        this.age = this.age * this.age
    }
}
</script>
