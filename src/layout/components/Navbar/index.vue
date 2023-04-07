<template>
  <div class="navbar">
    <div class="flex left-menu items-center">
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right-menu">
      <el-dropdown
        class="right-menu-item text-center w-40 avatar-container hover-effect"
        id="personal-center"
        size="medium"
      >
        <div class="avatar-wrapper">
          nickName
          <!-- <span>nickName</span> -->
          <i class="ml-2 el-icon-arrow-down" />
        </div>
        <el-dropdown-menu
          slot="dropdown"
          class="dropdownPop"
          style="width: 160px; margin-top: 0; overflow: hidden"
        >
          <router-link to="/personal">
            <el-dropdown-item> 个人中心 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display: block" @click="dialogFlag = true">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ConfirmDialog
      v-model="dialogFlag"
      @close="dialogFlag = false"
      :dialogFlag="dialogFlag"
      content="确定要退出当前账号？"
      details="确定要退出当前账号？"
      @confirmDone="logout"
    >
    </ConfirmDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Breadcrumb from '@/layout/components/Breadcrumb/index.vue';
import Hamburger from '@/layout/components/Hamburger/index.vue';
import { AppModule } from '@/store/modules/app';
import { UserModule } from '@/store/modules/user';
import { GetUserApi } from '@/api/login';
// 导入接口
@Component({
  components: {
    Breadcrumb,
    Hamburger,
  },
})
export default class Navbar extends Vue {
  dialogFlag = false;
  get sidebar() {
    return AppModule.sidebar;
  }

  get userInfo() {
    return UserModule.useData ?? {};
  }

  get avatar() {
    return require('@/assets/avatar.gif');
  }

  async mounted() {
    if (UserModule.token && !UserModule.useData?.id) {
      const { data } = await GetUserApi({ username: 'admin', password: '123456' });
      UserModule.setUserData(data);
    }
  }

  toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  async logout() {
    UserModule.deltoken();
    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  // background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid rgba(201, 211, 213, 0.7);

  .hamburger-container {
    float: left;
    height: 50px;
    padding: 0 15px;
    font-size: 24px;
    line-height: 55px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .left-menu {
    float: left;
  }
  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    line-height: 50px;

    .theme-cnt {
      margin: 12px 10px 0 0;
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      color: #5a5e66;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
