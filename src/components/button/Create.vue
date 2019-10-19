<template>
  <el-button :size="size" type="primary"  @click="$emit('click')">
    <slot name="icon">
      <i :class="icon"></i>
    </slot>
    <slot>{{text}}</slot>
  </el-button>
</template>

<script>
  import button from './minxins/button'
  export default {
    mixins: [button],
    props: {
      icon: {
        type: String,
        default: 'el-icon-plus'
      },
      text: {
        type: String,
        default: '创建'
      }
    }
  }
</script>
