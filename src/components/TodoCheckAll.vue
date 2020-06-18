<template>
  <div>
    <label><input type="checkbox"
    @input="checkAll" :checked="!anyRemaining"/>Check all</label>
  </div>
</template>

<script>
export default {
  name: 'TodoCheckAll',
  computed: {
    anyRemaining () {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    checkAll () {
      this.$store.commit('checkAll', event.target.checked)
      this.$store.commit('updateFilter', 'all')
    }
  }
}
</script>
