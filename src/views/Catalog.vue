<template>
  <CatalogList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CatalogList from '@/features/catalog/Components/CatalogList.vue';

export default defineComponent({
  name: 'Catalog',
  components: {
    CatalogList,
  },
})
</script>
