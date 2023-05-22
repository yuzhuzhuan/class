<template>
  <div class="h-full overflow-auto">
    <div class="flex justify-between">
      <div class="title">{{ title }}</div>
    </div>
    <div class="detail-container">
      <el-form ref="submitForm" :model="submitForm" label-width="100px" :show-message="false">
        <yk-form-item :label="$ts('role.roleName') + ':'" prop="name" required>
          <div class="flex">
            <yk-input v-model.trim="submitForm.name" style="width: 300px" @blur="verifyName" />
            <YkMessage
              :text="warnNameText"
              type="warning"
              :is-show="!!warnNameText"
              class="ml-2 w-60"
            >
            </YkMessage>
          </div>
        </yk-form-item>
        <yk-form-item :label="$ts('role.roleMenus') + ':'" prop="menus" required>
          <div class="flex">
            <yk-input
              v-model.trim="submitForm.menus"
              prefix-icon="el-icon-search"
              placeholder="输入菜单名称搜索"
              style="width: 300px"
              @blur="verifyMenu"
            >
            </yk-input>
            <YkMessage
              :text="warnMenuText"
              type="warning"
              :is-show="!!warnMenuText"
              class="w-60 ml-2"
            >
            </YkMessage>
          </div>
        </yk-form-item>
      </el-form>
      <div
        class="border border-solid border-gray-300 h-[25rem] mb-5 ml-[6.25rem] p-4 w-[18.75rem] overflow-auto"
      >
        <el-tree
          ref="tree"
          :data="initMenus"
          show-checkbox
          node-key="id"
          :default-expanded-keys="defaultShowNodes"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @check-change="handleCheckChange"
        >
        </el-tree>
      </div>
    </div>
    <div class="flex justify-center items-center">
      <el-button @click="$emit('done')">{{ $ts('global.cancel') }}</el-button>
      <el-button type="primary" @click="save()">{{ $ts('global.save') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Prop, Watch } from 'vue-property-decorator';
import service from '@/services/role';
import { Form } from 'element-ui';

@Component({ components: {} })
export default class RoleDetail extends Vue {
  @Ref('submitForm') readonly $submitForm!: Form;
  @Ref('tree') readonly $refTree!: any;
  @Prop({ type: Number, required: true })
  roleId!: number;
  title = '新增角色';
  submitForm = {
    id: '',
    name: '',
    menus: '',
  } as any;
  warnMenuText = '';
  warnNameText = '';
  initMenus = [] as any; // 所有权限数据
  initRoles = [] as any;
  menus = [] as any;
  name = ''; // 角色名称，用来检测是否和其他角色名重复

  // 默认展开的id组
  defaultShowNodes = [] as any;
  defaultProps = {
    children: 'children',
    label: 'label',
  };
  get isEdit() {
    return this.roleId;
  }

  @Watch('roleId')
  async onroleIdChange(val: any) {
    if (val) {
      this.getDetail(this.isEdit);
      this.title = '编辑角色';
    } else {
      this.submitForm.name = '';
      this.$refTree.setCheckedKeys([]);
      this.title = '新增角色';
    }
  }
  filterNode(value: any, data: any) {
    if (!value) return true;
    return data.label.indexOf(value) !== -1;
  }

  handleCheckChange() {
    // 获取所有选中的子节点 start
    const childNode = this.$refTree.getCheckedKeys();
    // // 获取半选的节点
    const halfSelected = this.$refTree.getHalfCheckedKeys();
    this.menus = [...childNode, ...halfSelected];

    this.verifyMenu();
  }

  // 获取角色名称列表
  async getRole(params = {} as any) {
    const { data } = await service.query({ ...params });
    this.initRoles = data;
  }

  // 获取角色菜单列表
  async getMenu() {
    const { data } = await service.queryMenu();
    this.initMenus = this.changeData(data);
  }

  // // 处理成二维数组
  changeData(data: any, parentId = 0) {
    const arr = JSON.parse(JSON.stringify(data));
    return arr.filter((item: any) => {
      if (item.parentId === parentId) {
        item.label = item.name;
        item.children = this.changeData(data, item.id);
        return true;
      }
      return false;
    });
  }

  // // 获取角色信息
  async getDetail(id: number) {
    const { data } = await service.detail({ id });
    this.submitForm.name = data.name;
    this.name = data.name;

    this.$refTree.setCheckedKeys(data.menus);
  }

  async created() {
    await this.getMenu();
    await this.getRole();
    // 第1个是默认展开几级 第2个是源数据
    this.getDefaultShowNodes(1, this.initMenus);
  }
  getDefaultShowNodes(num: any, children: any) {
    --num;
    if (num >= 0) {
      for (let i = 0; i < children.length; i++) {
        this.defaultShowNodes.push(children[i].id);
        if (children[i].children) {
          this.getDefaultShowNodes(num, children[i].children);
        }
      }
    }
  }

  validatePassName() {
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

  verifyName() {
    if (this.validatePassName()) {
      this.warnNameText = '角色名称重复,请重新输入!';
      return;
    } else if (!this.submitForm.name) {
      this.warnNameText = '请填写必填项!';
      return;
    }
    this.warnNameText = '';
  }
  verifyMenu() {
    if (!this.menus.length) {
      this.warnMenuText = '请选择菜单!';
      return;
    }
    this.warnMenuText = '';
  }
  async save() {
    this.verifyMenu();
    this.verifyName();
    if (!!this.warnNameText || !!this.warnMenuText) return;
    if (this.isEdit) {
      await service.update({
        id: this.$route.params.roleId,
        name: this.submitForm.name,
        menus: this.menus,
      });
      this.$message.success('更新用户角色成功');
    } else {
      await service.create({ name: this.submitForm.name, menus: this.menus });
      this.$message.success('新增角色成功');
    }
    this.$emit('done');
    this.submitForm.name = '';
  }
}
</script>
<style scoped lang="scss"></style>
