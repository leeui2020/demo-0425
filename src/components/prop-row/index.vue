<template>
  <div class="props" :class="[close && 'close']">
    <div class="props-content" ref="contentEl">
      <div
        class="props-item"
        v-for="item in props"
        :key="item.id"
      >
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="props-suffix">
      <div class="props-action" @click="toggleClose" v-if="showClose">
        <span>{{ actionText }}</span>
        <span class="props-action-icon icon-arrow-down"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue"

const $props = defineProps({
  props: {
    type: Array,
    default: () => []
  }
})

const props = computed(() => $props.props)

const contentEl = ref(null)
const showClose = ref(false)
const computedHeight = async () => {
  await nextTick()
  if (!contentEl.value) return
  contentEl.value.classList.add('computing')
  contentEl.value.style.height = null
  const rect = contentEl.value.getBoundingClientRect()
  showClose.value = rect.height > 60
  contentEl.value.classList.remove('computing')
  contentEl.value.style.height = `${rect.height}px`
}

const close = ref(true)
const actionText = computed(() => close.value ? '更多' : '收起')
const toggleClose = () => (close.value = !close.value)

onMounted(computedHeight)
watch(props, computedHeight)
</script>

<style lang="scss" scoped>
.props {
  display: flex;
  align-items: flex-start;

  &-content {
    flex: 1;
    width: 0;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    transition: height 0.3s;
    overflow: hidden;

    .close &:not(.computing) {
      height: 36px !important;
    }

    &.computing {
      visibility: hidden;
    }
  }

  &-item {
    width: calc(100% / 9);
    min-width: 100px;
    height: 36px;
    line-height: 36px;
    padding-right: 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
    cursor: pointer;
    @extend %text-cut;

    &:hover {
      color: var(--color-primary);
    }
  }

  &-suffix {
    width: 80px;
    text-align: right;
  }

  &-action {
    height: 36px;
    display: inline-flex;
    @extend %flex-middle;
    cursor: pointer;
    &-icon {
      transform: scale(0.7) rotate(180deg);
      margin-left: 4px;
      transition: all 0.3s;
      .close & {
        transform: scale(0.7) rotate(0);
      }
    }
  }
}
</style>
