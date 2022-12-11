<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      {{ message}}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { inject } from 'vue'

@Options({
  props: {
    msg: String
  },
})
export default class HelloWorld extends Vue {
    msg!: string
    message = "hi"
    bus = inject('TableKey')

    onExpand() {
        //this.eventBus.emit('age', 22)

        //this.eventBus.emit("test-1", 25);

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
