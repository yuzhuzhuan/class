<template>
  <div class="tab-container">
    <ul id="tabs" class="tabs-ul overflow-auto">
      <scroller :parent-id="`tabs`" :type="`horizontal`">
        <li
          v-for="item in TabList"
          :key="item.path"
          :class="['tab-li', item.path === currentTab ? 'is-active' : '']"
          @click.prevent="goToPage(item)"
        >
          {{ menusTitle(item.title) }}
          <i
            v-if="item.path !== '/index'"
            class="el-icon-close"
            @click.stop="closeCurentTab(item.path)"
          ></i>
        </li>
      </scroller>
    </ul>
    <!-- 更多操作 -->
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        {{ $ts('navbar.actions') }}
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="ECloseTab.closeCurrent">
          {{ $ts('navbar.closeCurrent') }}</el-dropdown-item
        >
        <el-dropdown-item :command="ECloseTab.closeOther">
          {{ $ts('navbar.closeOther') }}</el-dropdown-item
        >
        <el-dropdown-item :command="ECloseTab.closeAll">
          {{ $ts('navbar.closeAll') }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { AppModule } from '@/store/modules/app';
import { IRouteObj } from '@/types/routeTypes';
import { Component, Vue } from 'vue-property-decorator';
import Scroller from '@/layout/components/Scroller/index.vue';
import { ECloseTab } from './types';

@Component({
  components: {
    Scroller,
  },
})
export default class Tab extends Vue {
  /**
   * 关闭按钮的枚举
   */
  ECloseTab = ECloseTab;
  // 获取TabList
  get TabList() {
    return AppModule.TabList;
  }
  menusTitle(item: any) {
    if (this.$ts(`route.${item}`)) {
      return this.$ts(`route.${item}`);
    }
    return item;
  }

  /**
   * 获取当前选中的值，需要使用计算属性
   */
  get currentTab() {
    return AppModule.currentTab;
  }

  /**
   * 关闭当前tab
   */
  closeCurentTab(path: string) {
    if (path === '/index') return;
    let index = -1;
    this.TabList.forEach((it, i) => {
      if (it.path === path) {
        console.log(i);
        index = i - 1;
      }
    });
    // 关闭的tab 和当前显示的不一样，不需要进行push
    if (this.TabList[index].path !== this.currentTab) {
      this.$router.push(this.TabList[index].path);
    }
    AppModule.closeTab(path);
  }

  /**
   * 千万选中的tab
   */
  goToPage(route: IRouteObj) {
    const { path } = route;
    // 如果当前的路由和点击的路由一样，不进行push
    if (this.currentTab === path) {
      return;
    }
    this.$router.push(path);
  }

  /**
   * 点击按钮的关闭操作
   */
  handleCommand(tip: ECloseTab) {
    if (tip === ECloseTab.closeCurrent) {
      this.closeCurentTab(this.currentTab);
    } else if (tip === ECloseTab.closeOther) {
      if (this.currentTab === '/index') {
        AppModule.closeAll();
        return;
      }
      AppModule.closeOther();
    } else if (tip === ECloseTab.closeAll) {
      if (this.currentTab !== '/index') {
        this.$router.push('/index');
      }
      AppModule.closeAll();
    }
  }

  created() {
    // 一打开页面时只要首页
    AppModule.closeAll();
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
.tab-container {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // padding: 5px 0;

  .tabs-ul {
    display: flex;
    box-sizing: border-box;
    width: calc(100% - 134px);
    height: 100%;
    padding-right: 5px;
    overflow: hidden;
    line-height: 52px;

    &:hover {
      overflow: auto;
    }

    .tab-li {
      display: inline-block;
      box-sizing: border-box;
      height: 38px;
      margin-right: 5px;
      padding: 0 10px;
      color: color.mix($subColor, rgb(49, 46, 46), 90%);
      font-size: 14px;
      line-height: 38px;
      white-space: nowrap;
      background-color: color.mix(#fff, rgb(49, 46, 46), 90%);
      border: 1px solid color.mix(#fff, rgb(49, 46, 46), 90%);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s linear;
      user-select: none;

      &.is-active,
      &:hover {
        color: #fff;
        background-color: $mainColor;
        border-color: color.mix($mainColor, #fff, 90%);
        transition: all 0.3s linear;
      }
      &:first-child {
        margin-left: 15px;
      }
      i {
        width: 14px;
        height: 14px;
        line-height: 14px;
        border-radius: 50%;
        transition: all 0.3s linear;
        &:hover {
          color: #000;
          background: #fff;
          transition: all 0.3s linear;
        }
      }
    }
  }
}
</style>
