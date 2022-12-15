import { defineStore } from 'pinia'

export const useStore = defineStore('counter', {
  state: () => {
    return { count: 0, name: 'Drew', show: false }
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
