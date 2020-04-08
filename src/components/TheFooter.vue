<template>
  <div class="footer">
    <el-divider />
    <div class="routers">
      <div class="route">
        <el-link href="/">首页</el-link>
      </div>
      <span>|</span>
      <div class="route">
        <el-link href="/">首页</el-link>
      </div>
    </div>
    <div class="main-content">
      <!-- <div class="item">
        <div class="title">欢迎合作</div>
        <div class="text">
        </div>
      </div> -->
            <!-- <div class="item">
        <div class="title">优质服务</div>
        <div class="text">
        </div>
      </div> -->
      <div class="item friend-link">
        <div class="title">友情链接</div>
        <!-- <div class="text">
          <el-link href="http://www..com/" target="_blank"></el-link>
        </div>
        <div class="text">
          <el-link href="http://www..com/" target="_blank"></el-link>
        </div> -->
      </div>
      <!-- <div class="item">
        <div class="title">联系我们</div>
        <div class="text">
          <div class="info-content">
            <i
              class="el-icon-location-information"
            />
          </div>
        </div>
        <div class="text">
          <div class="info-content">
            <i class="el-icon-phone" />120-12398-12397
          </div>
        </div>
        <div class="text">
          <div class="info-content">
            <i class="el-icon-message" />912319875@qq.com
          </div>
        </div>
      </div> -->
    </div>
    <div class="others">
      <div class="copyright">
        版权所有：strk2333 | 苏ICP备19070190号-1
      </div>
      <el-link class="map-link" href="/sitemap.xml" target="_blank">网站地图</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../share.scss";
$foot-height: 5vmax;
.footer {
  width: 100%;
  background: url("../assets/bg_part4.png");
  background-size: contain;

  .el-link,
  & {
    color: $grey6;
    font-size: $text12;
  }

  .routers {
    margin: 1em 10%;
    text-align: center;

    > * {
      display: inline-block;
    }

    .route {
      margin: 0 1em;
    }
  }

  .main-content {
    margin: 2em 10% 1em 10%;
    text-align: center;
    > * {
      display: inline-block;
      width: 20%;
      margin: 0 1%;
      vertical-align: top;
      text-align: left;
    }

    .item {
      .title {
        font-weight: bold;
      }
      .text {
        padding-top: 5px;
      }
    }

    .friend-link {
      width: 20%;
    }
  }

  .others {
    padding: 5px 0 1em 0;
    text-align: center;
    .copyright {
      display: inline-block;
      vertical-align: middle;
    }

    .map-link {
      display: inline-block;
      margin-left: 2em;
    }
  }
}
</style>
