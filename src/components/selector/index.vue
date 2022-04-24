<template>
  <ElSelect :placeholder="props.title" v-model="value">
    <ElOption
      v-for="item in props.options"
      :key="item.id"
      :label="item.label"
      :value="item.id"
    />
  </ElSelect>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },

  title: String,

  modelValue: String
})

const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style lang="scss" scoped>
.el-select {
  ::v-deep(.el-input__wrapper) {
    border-radius: 10000px;
    background: transparent;
    font-size: var(--font-size-sm);
    .el-input__inner {
      color: inherit;
    }
  }
}
</style>
