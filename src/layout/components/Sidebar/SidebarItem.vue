<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      'menu-wrapper',
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item
          v-if="hasPermit(theOnlyOneChild.meta && theOnlyOneChild.meta.id)"
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <YkIcon
            v-if="theOnlyOneChild.meta.icon"
            :icon="theOnlyOneChild.meta.icon"
            class="mr-4 mb-1.5 ml-4 text-2xl"
          />
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{
            menusTitle(theOnlyOneChild.meta.title)
          }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body class="el-submenu">
      <template slot="title">
        <YkIcon
          v-if="item.meta && item.meta.icon"
          :icon="item.meta.icon"
          class="mr-4 mb-1.5 ml-4 text-2xl"
        />
        <span v-if="item.meta && item.meta.title" id="title" slot="title">{{
          menusTitle(item.meta.title)
        }}</span>
      </template>
      <template v-if="item.children">
        <template v-for="child in item.children">
          <sidebar-item
            v-if="hasPermit(child.meta && child.meta.id)"
            :key="child.path"
            :item="child"
            :is-collapse="isCollapse"
            :is-first-level="false"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
          />
        </template>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from 'path-browserify';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { isExternal } from '@/utils/validate';
import SidebarItemLink from './SidebarItemLink.vue';
import { UserModule } from '@/store/modules/user';

@Component({
  components: {
    SidebarItemLink,
  },
})
export default class SidebarItem extends Vue {
  @Prop({ required: true }) item!: RouteConfig;
  @Prop({ default: false }) isCollapse!: boolean;
  @Prop({ default: true }) isFirstLevel!: boolean;
  @Prop({ default: '' }) basePath!: string;
  /**
   * 获取权限路由
   */
  get hasPermit() {
    return UserModule.hadPermit;
  }
  get alwaysShowRootMenu() {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true;
    }
    return false;
  }

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          return true;
        }
      });
      return showingChildren.length;
    }
    return 0;
  }

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' };
  }

  resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }
  menusTitle(item: any) {
    if (this.$ts(`route.${item}`)) {
      return this.$ts(`route.${item}`);
    }
    return item;
  }
}
</script>

<style lang="scss">
// 修改折叠后不正确的样式
.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      position: relative;
      padding: 0 !important;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0 !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        /* stylelint-disable-next-line selector-max-id */
        & > #title {
          display: none;
        }
      }
    }
  }
}
.el-submenu__title i {
  &:before {
    color: #fff;
  }
}
</style>

<style lang="scss" scoped></style>
