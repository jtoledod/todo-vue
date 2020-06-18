<template>
  <div>
    <button :class="{active: filter == 'all'}"
      @click="changeFilter('all')">All</button>
    <button :class="{active: filter == 'active'}"
      :disabled="!anyRemaining"
      @click="changeFilter('active')">Active</button>
    <button :class="{active: filter == 'completed'}"
      :disabled="!anyCompleted"
      @click="changeFilter('completed')">Completed</button>
</div>
</template>

<script>
export default {
  name: 'TodoFilters',
  computed: {
    filter () {
      return this.$store.state.filter
    },
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    anyCompleted () {
      return this.$store.getters.anyCompleted
    }
  },
  methods: {
    changeFilter (filter) {
      this.$store.commit('updateFilter', filter)
    }
  }
}
</script>
