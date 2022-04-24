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

    <div class="row">
      <div class="row-label">其他选项</div>
      <div class="row-selectors">
        <div
          class="row-selector"
          v-for="item in others"
          :key="item.id"
        >
          <app-selector
            :title="item.title"
            :options="item.options"
            v-model="othersModel[item.id]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTabs, getProps, getOthers } from '@/api/base'
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

const others = await getOthers()
const othersModel = ref(Object.fromEntries(others.map((v) => [v.id, ''])))
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

  &-selectors {
    flex: 1;
    width: 0;
    display: flex;
    flex-wrap: wrap;
  }

  &-selector {
    width: calc(100% /  7);
    min-width: 120px;
    padding-right: 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
}
</style>
