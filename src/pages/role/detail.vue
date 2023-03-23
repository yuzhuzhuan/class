<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-form
        ref="submitForm"
        :model="submitForm"
        :rules="rules"
        label-width="80px"
        hide-required-asterisk
      >
        <yk-form-item label="角色名称" prop="name" required :rules="rules.name">
          <yk-form-input v-model.trim="submitForm.name" />
        </yk-form-item>

        <el-form-item label="角色菜单" prop="menus">
          <el-table :data="initMenus" border align="center" style="width: 100%">
            <el-table-column
              :resizable="false"
              width="55"
              :render-header="renderHeader"
              align="center"
            >
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.itemCheck"
                  @change="toggleCheck(scope.row)"
                  :indeterminate="scope.row.status"
                ></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="模块标题"
              width="200"
              :resizable="false"
              align="left"
            >
            </el-table-column>
            <el-table-column label="操作" align="left" :resizable="false">
              <template #default="{ row: { childList } }">
                <el-checkbox-group v-model="list">
                  <template v-for="item in convertList(childList)">
                    <el-checkbox
                      :label="item.name"
                      :key="item.id"
                      :checked="item.checked"
                      @change="(val) => select(val, item)"
                    >
                    </el-checkbox>
                  </template>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button @click="$router.push('/role/index')">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import { getMenuListApi } from '../../../api/menu'; // 导入接口
import { getRoleListApi, getRoleApi, addRoleApi, updateRoleApi } from '../../../api/role'; // 导入接口
import { Form } from 'element-ui';

@Component({ components: {} })
export default class RoleDetail extends Vue {
  @Ref('submitForm') readonly $submitForm!: Form;
  submitForm = {
    id: '',
    name: '',
  };

  initMenus = [] as any; // 所有权限数据
  list = [] as any; // 功能权限列 勾选后显示的内容
  initRoles = [] as any;
  name = ''; // 角色名称，用来检测是否和其他角色名重复
  isCheck = false; // 控制全选按钮的全选样式
  indeterminate = false; // 控制全选按钮的半选样式
  rules = {
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  };

  get isEdit() {
    return 'roleId' in this.$route.params;
  }

  convertList(list: any): any[] {
    return list;
  }

  // 获取角色名称列表
  async getRole(params = {} as any) {
    const { data } = await getRoleListApi({ ...params });
    this.initRoles = data;
  }

  // 获取角色菜单列表
  async getMenu() {
    const { data } = await getMenuListApi();
    this.initMenus = this.changeData(data);
  }

  // 处理成二维数组
  changeData(data: any, parentId = 0) {
    const arr = JSON.parse(JSON.stringify(data));
    return arr.filter((item: any) => {
      if (item.parentId === parentId) {
        item.status = false;
        item.childList = this.changeData(data, item.id);
        return true;
      }
      return false;
    });
  }

  // 获取角色信息
  async getDetail(id: string) {
    const { data } = await getRoleApi(id);
    this.submitForm.name = data.name;
    this.name = data.name;
    data.menus.forEach((item: any) => {
      if (item.childList) {
        item.childList.forEach((child: any) => {
          this.list.push(child.name);
          this.menus.push(child.id);
        });
      }
      this.list.push(item.name);
      this.menus.push(item.id);
    });
    this.initMenus.forEach((item: any) => {
      item.childList.forEach((item2: any) => {
        this.list.forEach((name: any) => {
          if (item2.name === name) {
            item2.itemCheck = true;
          }
        });
      });
    });

    this.changeStatus();
  }

  // 生成表格自定义列的复选框
  renderHeader(h: any, data: any) {
    return h('span', [
      h('el-checkbox', {
        on: {
          change: this.selectBox,
        },
        props: {
          value: this.isCheck,
          indeterminate: this.indeterminate,
        },
      }),
    ]);
  }

  // 表头复选框全选事件
  selectBox() {
    this.isCheck = !this.isCheck;
    const list = [...this.initMenus];
    for (const val of list) {
      val.itemCheck = this.isCheck;
    }
    this.initMenus = list;
    this.initMenus.forEach((item: any) => {
      if (this.isCheck) {
        item.itemCheck = true;
        item.status = false;
        item.childList.forEach((item2: any) => {
          item2.itemCheck = true;
          this.list.push(item2.name);
          this.menus.push(item2);
        });
      } else {
        item.itemCheck = false;
        item.childList.forEach((item2: any) => {
          item2.itemCheck = false;
          item2.stauts = false;
        });
      }
    });
    if (this.isCheck) {
      this.indeterminate = false;
    } else {
      this.list = [];
      this.menus = [];
    }
  }

  // 每行复选框事件
  toggleCheck(row: any) {
    // 获取已勾选
    const list = this.initMenus.filter((item: any) => item.itemCheck);
    this.isCheck = list.length === this.initMenus.length;
    this.indeterminate = list.length > 0 && list.length < this.initMenus.length;
    row.childList.forEach((children: any) => {
      if (row.itemCheck) {
        children.itemCheck = true;
        this.list.push(children.name);
        this.menus.push(row, children);
      } else {
        children.itemCheck = false;
        this.list.forEach((name: any, index: any) => {
          if (name === children.name) {
            this.list.splice(index, 1);
          }
        });
        this.menus.forEach((id: any, index: any) => {
          if (id === children.id) {
            this.menus.splice(index, 1);
          }
        });
      }
    });
  }

  // 改变左侧复选框状态
  changeStatus() {
    this.initMenus.forEach((item2: any) => {
      item2.status = item2.childList.some((item3: any) => item3.itemCheck);
    });

    this.initMenus.forEach((item2: any) => {
      item2.itemCheck = item2.childList.every((item3: any) => item3.itemCheck);
      if (item2.itemCheck) {
        item2.status = false;
      }
    });
    const headBol = this.initMenus.every((item: any) => item.itemCheck);
    if (headBol) {
      this.isCheck = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
      this.isCheck = false;
    }
  }

  created() {
    this.getMenu();
    this.getRole();
  }

  menus = [] as any;
  select(val: any, item: any) {
    this.initMenus.forEach((item2: any) => {
      item2.childList.forEach((item3: any) => {
        if (item.name === item3.name) {
          if (val) {
            item3.itemCheck = true;
            this.menus.push(item);
          } else {
            item3.itemCheck = false;
            this.menus.forEach((i: any, index: any) => {
              if (i === item.id) {
                this.menus.splice(index, 1);
              }
            });
          }
        }
      });
    });
    this.changeStatus();
  }

  validatePass() {
    const resultArr = this.initRoles.filter((item: any) => {
      if (this.isEdit) {
        return item.name !== this.name;
      } else {
        return item.name;
      }
    });
    const bol = resultArr.some((item: any) => item.name === this.submitForm.name);
    return bol;
  }

  save() {
    this.$submitForm.validate(async (result: any) => {
      if (!this.isEdit && !this.menus.length) {
        setTimeout(() => {
          this.$message.warning('请选择菜单');
        }, 200);
      }

      if (this.validatePass()) {
        this.$message.warning('角色名称重复,请重新输入!');
      } else if (result && this.menus.length) {
        if (this.isEdit) {
          await updateRoleApi({
            id: this.$route.params.roleId,
            name: this.submitForm.name,
            menus: this.menus,
          });
          this.$message.success('更新用户角色成功');
        } else {
          await addRoleApi({ name: this.submitForm.name, menus: this.menus });
          this.$message.success('新增角色成功');
        }
        this.$router.push('/role/index');
      }
    });
  }

  async mounted() {
    if (this.$route.params.roleId) {
      await this.getDetail(this.$route.params.roleId);
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
::v-ddep .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: auto;
}
</style>
