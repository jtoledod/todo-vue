<template>
  <div>
    <button v-if="anyCompleted"
    @click="clearCompleted">Clear completed</button>
  </div>
</template>

<script>
export default {
  name: 'TodoClearCompleted',
  computed: {
    anyCompleted () {
      return this.$store.getters.anyCompleted
    }
  },
  methods: {
    clearCompleted () {
      this.$store.commit('clearCompleted')
    }
  }
}
</script>
