<template>
  <div id="app">
    <m-header msg="header" />
    <transition name="slide">
      <router-view class="view"></router-view>
    </transition>
    <m-footer msg="footer" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import mHeader from "@/components/TheHeader.vue";
import mFooter from "@/components/TheFooter.vue";
import "./share.scss";

@Component({
  components: {
    "m-header": mHeader,
    "m-footer": mFooter
  },
  mounted() {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "margin: 0");
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 14px;
}

body {
  overflow: auto !important;
}

.banner {
  width: 100%;
  overflow: initial;
}
</style>
