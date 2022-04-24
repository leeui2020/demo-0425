<template>
  <div class="tab">
    <div
      class="tab-item"
      :class="[modelValue === item.id && 'is-active']"
      v-for="item in tabs"
      :key="item.id"
      @click="handleClick(item)"
    >
      <img class="tab-item-icon" :src="item.icon">
      <span class="tab-item-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const { tabs, modelValue } = defineProps({
  tabs: {
    type: Array,
    default: () => []
  },

  modelValue: String
})

function handleClick (item) {
  emit('update:modelValue', item.id)
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  margin-bottom: 15px;
  position: relative;

  &-item {
    height: 46px;
    min-width: 80px;
    padding: 0 15px;
    background: var(--bg-tabs);
    border-radius: 10px 10px 0 0;
    cursor: pointer;
    @extend %flex-center;

    &-icon {
      width: 18px;
      height: 18px;
      border-radius: 100%;
      margin-right: 8px;
    }

    &-label {
      color: var(--text-color-df);
      opacity: 0.7;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover > &-label,
    &.is-active > &-label {
      opacity: 1;
    }

    &.is-active {
      background: var(--color-primary);
    }

    &.is-active > &-label {
      color: var(--text-color-reverse);
    }
  }

  &::after {
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: var(--bg-tabs);
    position: absolute;
  }
}
</style>
