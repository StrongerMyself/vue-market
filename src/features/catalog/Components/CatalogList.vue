<template>
  <button @click="fetchList">Load</button>
  <pre>{{ JSON.stringify({ isLoading, list }, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default defineComponent({
  name: 'CatalogList',
  computed: {
    ...mapState('catalog', ['list']),
    ...mapGetters('catalog', ['isLoading']),
  },
  methods: {
    ...mapActions('catalog', ['fetchList'])
  },
  mounted() {
    this.fetchList()
  }
})
</script>

<style lang="scss" scoped>
pre {
  width: min-content;
  margin: 0 auto;
  text-align: left;
}
</style>