<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <tab />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { AppModule } from '@/store/modules/app';
import { Component, Vue } from 'vue-property-decorator';
import { AppMain, Navbar, Sidebar, Tab } from './components';
import { UserModule } from '@/store/modules/user';

@Component({
  components: {
    AppMain,
    Navbar,
    Sidebar,
    Tab,
  },
})
export default class Layout extends Vue {
  /**
   * 绑定类名
   */
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
    };
  }

  /**
   * 获取侧边栏状态
   */
  get sidebar() {
    return AppModule.sidebar;
  }
  get userInfo() {
    return UserModule.useData ?? {};
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.main-container {
  position: relative;
  min-height: 100%;
  margin-left: $sideBarWidth;
  transition: margin-left 0.28s;
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  width: $sideBarWidth !important;
  height: 100%;
  overflow: hidden;
  font-size: 0;
  transition: width 0.28s;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 96px);
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
