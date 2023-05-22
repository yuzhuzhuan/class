<template>
  <div class="text-center sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img
          :src="collapse ? logoCollapse : logo"
          class="sidebar-logo inline-block"
          :class="{ '!w-[6.25rem]': !collapse }"
        />
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import logo from '@/assets/images/logo.png';
import logoCollapse from '@/assets/images/logo-collapse.png';

@Component({})
export default class SidebarLogo extends Vue {
  @Prop({ required: true }) collapse!: boolean;

  logo = logo;
  logoCollapse = logoCollapse;
  title = 'VUE2-TS-TEMPLATE';
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  text-align: center;
  background: $mainColor;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      line-height: 50px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
