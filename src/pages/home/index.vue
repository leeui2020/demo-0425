<template>
  <app-tabs :tabs="tabs" v-model="tabSelected" />
</template>

<script setup>
import { getTabs } from '@/api/base'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const tabs = await getTabs()
const tabSelected = computed({
  get: () => route.params.id || tabs[0].id,
  set: (id) => {
    if (id !== tabSelected) {
      router.push({
        name: route.name,
        query: route.query,
        params: {
          ...route.params,
          id
        }
      })
    }
  }
})
</script>
