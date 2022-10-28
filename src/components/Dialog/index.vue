<template>
  <el-dialog
    :title="dialogTitle"
    class="device-add"
    :visible.sync="dialogFlag"
    :before-close="handleClose"
    width="30%"
  >
  <slot></slot>
    <!-- <el-form label-width="80px" :model="form"  ref="FormRef">
      <el-form-item label="用户姓名" prop="name"
      :rules="FormValidator.checkStringLength(2, 50, '用户姓名', true, 'blur')">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入用户姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户性别"  prop="gender" :rules="
              FormValidator.checkStringLength(1, 1, '用户性别', true, 'blur')
            ">
        <el-input
          v-model.trim="form.gender"
          placeholder="请输入用户性别"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式"  prop="phone"
       :rules="FormValidator.isPhone(true, '手机号','blur')" >
        <el-input
          v-model.trim="form.phone"
          placeholder="请输入用户手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号"  prop="idCard"
      :rules="FormValidator.isIDCard(true, 'blur')" >
        <el-input
          v-model.trim="form.idCard"
          placeholder="请输入用户身份证号"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户地址"   prop="address"
      :rules="FormValidator.checkStringLength(2, 50, '用户地址', true, 'blur')">
        <el-input
          v-model.trim="form.address"
          placeholder="请输入用户地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱"    prop="email"
       :rules="FormValidator.isEmail(true, '邮箱地址', 'blur')">
        <el-input
          v-model.trim="form.email"
          placeholder="请输入用户邮箱"
        ></el-input>
      </el-form-item>
    </el-form> -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Dialog'
})
export default class extends Vue {
  @Prop({}) dialogFlag!: false; // 控制dialog是否打开
  @Prop({}) mode!: 'add' | 'edit' | 'upload';

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

  handleClose () {
    this.$emit('done');
  }

  save () {
    this.$emit('close');
  }
}
</script>
<style lang='less' scoped></style>
