<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' ||
            index === breadcrumbs.length - 1 ||
            item.redirect === $route.path
          "
          class="no-redirect"
          >{{ menusTitle(item.meta.title) }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ menusTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import * as pathToRegexp from 'path-to-regexp';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RouteRecord, Route } from 'vue-router';

@Component({
  name: 'Breadcrumb',
})
export default class extends Vue {
  breadcrumbs: RouteRecord[] = [];

  menusTitle(item: any) {
    if (this.$ts(`route.${item}`)) {
      return this.$ts(`route.${item}`);
    }
    return item;
  }
  @Watch('$route')
  onRouteChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs

    if (route.path.startsWith('/redirect/')) {
      return;
    }
    this.getBreadcrumb();
  }

  created() {
    this.getBreadcrumb();
  }

  getBreadcrumb() {
    const matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
    // const first = matched[0];
    // if (!this.isDashboard(first)) {
    //   matched = [
    //     { path: "/", meta: { title: "跟节点" } } as RouteRecord,
    //   ].concat(matched);
    // }
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
  }

  // public isDashboard(route: RouteRecord) {
  //   const name = route && route.name;
  //   if (!name) {
  //     return false;
  //   }
  //   return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
  // }

  pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route;
    console.log(pathToRegexp);
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  }

  handleLink(item: any) {
    // console.log(item, this.$route, '--=====');

    const { redirect, path } = item;
    // // 当前已经是重定向的页面了
    if (redirect === this.$route.path) {
      return;
    }
    if (redirect) {
      this.$router.push(redirect);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
  // color: rgba(255, 255, 255, 0.8) !important;
  transition: all 0.1s linear;
  user-select: none;
}
::v-deep {
  .el-breadcrumb__inner > a:hover {
    color: #000 !important;
    transition: all 0.1s linear;
  }
}
.app-breadcrumb .el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  line-height: 50px;

  .no-redirect {
    // color: $menuText !important;
    // cursor: pointer;
    user-select: none;
  }
}
</style>

<style lang="scss">
.app-breadcrumb {
  .el-breadcrumb__inner > .no-redirect {
    color: #000;
  }
  .el-breadcrumb__inner > .stair,
  .el-breadcrumb__inner > a {
    color: #999 !important;
  }
}
</style>
