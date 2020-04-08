<template>
  <div class="title">
    <div class="deco" />
    <div class="content">
      {{title}}
    </div>
    <div class="sub-content">
      {{subTitle}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Title extends Vue {
  @Prop() private title!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../share.scss';
  .title {
    >div {
      display: inline-block;
    }

    .deco {

    }

    .content {
      font-size: $text20;
    }

    .sub-content {
      font-size: $text16;
    }
  }
</style>
