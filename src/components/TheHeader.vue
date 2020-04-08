<template>
  <div class="header">
    <div class="header-info">
      <div class="text1">欢迎访问Tools</div>
      <!-- <div class="text2">
        <i class="el-icon-location-information" />
        <div class="gap"></div>
        <i class="el-icon-phone" />
        <div></div>
      </div> -->
    </div>
    <div class="content-wrapper">
      <!-- <img class="logo" src="@/assets/logo.png" alt /> -->
      <div class="header-blank" />
      <nav class="tabs">
        <a :class="this.$route.path === '/' ? 'tab-active': 'tab'" href="/">首页</a>
        <!-- <a :class="this.$route.path.includes('/about') ? 'tab-active': 'tab'" href="/about">关于</a> -->
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../share.scss";
$head-info-height: 2vw;
$head-content-height: 5vw;

.header {
  // position: fixed;
  // top: 0;
  width: 100%;
  z-index: 1;

  .header-info {
    // height: $head-info-height;
    display: flex;
    justify-content: space-between;
    padding: 0 3%;
    color: $smoke;
    font-size: $text12;
    background-color: $grey3;

    > div {
      display: inline-block;
      height: $head-info-height;
      line-height: $head-info-height;
      height: $head-info-height;
    }

    .text2 {
      > * {
        display: inline-block;
        vertical-align: middle;
      }

      .gap {
        margin-right: 3em;
      }

      > i {
        margin-right: 5px;
      }
    }
  }

  .content-wrapper {
    display: flex;
    width: 96%;
    height: $head-content-height;
    padding: 1% 2%;
    background-color: $main-color;

    > * {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }

  .header-blank {
    width: 10%;
  }

  .logo {
    height: $head-content-height;
  }

  .tabs {
    display: inline-flex;
    flex: 1;
    align-items: center;
    margin: 0;

    .tab,
    .tab-active {
      flex: 1;
      height: 100%;
      line-height: $head-content-height;
      font-size: $text16;
      // font-weight: bold;
      text-align: center;
      user-select: none;
      cursor: pointer;

      &:hover {
        color: $sub-color !important;
        // background-color: $main-color-2;
      }

      // &:-webkit-any-link {
      //   color: black;
      //   text-decoration: none;
      // }
    }

    .tab-active {
      color: $sub-color !important;
      // pointer-events: none;
      // background-color: $main-color-2;
    }
  }
}
</style>
