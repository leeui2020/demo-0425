<template>
  <app-tabs :tabs="tabs" v-model="tabSelected" />
  <div class="container" :key="tabSelected">
    <div
      class="row"
      v-for="item in props"
      :key="item.id"
    >
      <div class="row-label">{{ item.title }}</div>
      <div class="row-content">
        <app-prop-row :props="item.children" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTabs, getProps } from '@/api/base'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

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

const props = ref([])

watch(tabSelected, async () => {
  props.value = await getProps()
}, { immediate: true })
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid var(--bg-tabs);
  padding: 16px;
  font-size: var(--font-size-sm);
}

.row {
  $h: 36px;
  @extend %flex-top;

  &-label {
    width: 80px;
    line-height: $h;
    font-weight: 600;
  }

  &-content {
    flex: 1;
    width: 0;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
