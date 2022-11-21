<template>
    <el-dialog :title="dialogTitle" class="device-add" :visible.sync="dialogFlag" :before-close="handleClose" width="30%">
        <el-form :model="form" label-width="80px" ref="FormRef">
            <el-form-item label="用户姓名" prop="name" :rules="FormValidator.checkStringLength(2, 50, '用户姓名', true, 'blur')">
                <el-input v-model.trim="form.name" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" prop="gender" :rules="FormValidator.checkStringLength(1, 1, '用户性别', true, 'change')">
                <el-select clearable filterable v-model="form.gender" class="w-full">
                    <el-option value="0" label="女"></el-option>
                    <el-option value="1" label="男"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone" :rules="FormValidator.isPhone(true, '手机号','blur')">
                <el-input v-model.trim="form.phone" placeholder="请输入用户手机号"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard" :rules="FormValidator.isIDCard(true, 'blur')">
                <el-input v-model.trim="form.idCard" placeholder="请输入用户身份证号"></el-input>
            </el-form-item>
            <el-form-item label="用户地址" prop="address" :rules="FormValidator.checkStringLength(2, 50, '用户地址', true, 'blur')">
                <el-input v-model.trim="form.address" placeholder="请输入用户地址"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email" :rules="FormValidator.isEmail(true, '邮箱地址', 'blur')">
                <el-input v-model.trim="form.email" placeholder="请输入用户邮箱"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="save()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Ref, Prop } from 'vue-property-decorator';
import { FormValidator } from '@/utils/formValidator';
import { Form } from 'element-ui/types';
import { IForm } from './type';
import moment from 'moment';
import { addProjectApi, updateProjectApi } from '../../../../api/project'; // 导入接口
@Component({})
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
      edit: '编辑',
      upload: '上传'
    };
    return map[this.mode];
  }

  // 关闭弹框、清空表单数据及验证规则、重新获取数据
  handleClose () {
    this.FormRef.resetFields();
    this.$emit('close');
  }

  // 新增和编辑后关闭弹框
  save () {
    const params = { ...this.form };
    // 验证通过再判断是新增还是编辑
    this.FormRef.validate(async (valide: boolean) => {
      if (valide) {
        params.gender === '男' ? (params.gender = 1) : (params.gender = 0);
        if (this.mode === 'add') {
          params.id = params.idCard;
          params.createTime = moment().format('YYYY-MM-DD  HH:mm');
          await addProjectApi(params);
        } else if (this.mode === 'edit') {
          await updateProjectApi(params);
        }
        this.handleClose();
        this.$emit('close');
      }
    });
  }
}
</script>
