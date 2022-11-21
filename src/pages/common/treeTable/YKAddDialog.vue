<template>
    <el-dialog :title="dialogTitle" class="device-add" :visible.sync="dialogFlag" :before-close="handleClose" width="30%">
        <el-form :model="form" label-width="80px" ref="FormRef">
            <el-form-item label="部门名称" prop="name" :rules="FormValidator.checkStringLength(2, 50, '部门名称', true, 'blur')">
                <el-input v-model.trim="form.name" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item label="部门位置" :rules="FormValidator.checkStringLength(2, 3, '部门位置', true, 'change')">
                <TreeSelect :options="data" placeholder="请输入部门位置..." v-model="value"></TreeSelect>
            </el-form-item>
            <el-form-item label="部门主管" prop="manager" :rules="FormValidator.checkStringLength(2, 3, '部门主管名称', true, 'blur')">
                <el-input v-model.trim="form.manager" placeholder="请输入部门主管名称"></el-input>
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce" :rules="FormValidator.checkStringLength(2, 50, '部门介绍', true, 'blur')">
                <el-input v-model.trim="form.introduce" placeholder="请输入部门介绍"></el-input>
            </el-form-item>
            <el-form-item label="部门邮箱" prop="email" :rules="FormValidator.isEmail(true, '邮箱地址', 'blur')">
                <el-input v-model.trim="form.email" placeholder="请输入部门邮箱"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="save()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Ref, Prop, Watch } from 'vue-property-decorator';
import { FormValidator } from '@/utils/formValidator';
import { Form } from 'element-ui/types';
import { IForm } from './type';
import TreeSelect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import moment from 'moment';
import Mock from 'mockjs';
import { addDepartmentApi, updateDepartmentApi } from '../../../../api/department'; // 导入接口
@Component({
  components: { TreeSelect }
})
export default class YKAddDialog extends Vue {
  /**
   * 表单的ref
   */
  @Ref() public FormRef!: Form;
  /**
   * 验证器
   */
  public FormValidator = FormValidator;
  /**
   * form表单显示内容
   */
  @Prop({}) form!: IForm;
  @Prop({}) data!: []; // 部门位置数据
  @Prop({}) val!: number; // 双向绑定栏目位置数据
  value!: number; // 双向绑定栏目位置数据
  /**
   * 控制打开弹框
   */
  @Prop({}) dialogFlag = false;
  /**
   * 弹框标题内容
   */
  @Prop({}) mode!: 'add' | 'edit';
  /**
   * 表单的标题显示内容
   */
  get dialogTitle () {
    const map = {
      add: '新增',
      edit: '编辑'
    };
    return map[this.mode];
  }

  @Watch('form.pid', { immediate: true })
  onPidChange () {
    this.value = this.val;
  }

  // 关闭弹框、清空表单数据及验证规则、重新获取数据
  handleClose () {
    this.FormRef.resetFields();
    this.$emit('close');
  }

  // 新增和编辑后关闭弹框
  save () {
    const params = { ...this.form };
    params.pid = this.value;
    // 验证通过再判断是新增还是编辑
    this.FormRef.validate(async (valide: boolean) => {
      if (valide) {
        if (this.mode === 'add') {
          params.id = Mock.mock('@id');
          params.createTime = moment().format('YYYY-MM-DD');
          await addDepartmentApi(params);
        } else if (this.mode === 'edit') {
          await updateDepartmentApi(params);
        }
        this.handleClose();
        this.$emit('close');
      }
    });
  }
}
</script>
