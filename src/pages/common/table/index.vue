<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-form size="mini" :inline="true">
        <el-row>
          <el-col :span="14">
            <el-form-item>
              <el-button type="primary" @click="goCreate">新增用户</el-button>
            </el-form-item>
          </el-col>
          <el-form-item label="用户姓名" width="520px">
            <el-input
              style="width: 260px"
              v-model.trim="userName"
              placeholder="请输入用户姓名"
              @keyup.enter.native="goQuery"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goQuery" icon="el-icon-search"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button @click="goReset" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <Table
        :columns="tableColumns"
        :list="list"
        :totalNum="total"
        :size="size"
        :currentPage="currentPage"
        @changeSize="changeSize"
        @changePageIndex="changePageIndex"
        @edit="edit"
        @del="del"
      ></Table>
      <Dialog
        v-model="dialogFlag"
        :dialogFlag="dialogFlag"
        :mode="mode"
        @done="done"
        @close="closeDone"
      >
      <el-form :model="form" label-width="80px" ref="FormRef">
        <el-form-item  label="用户姓名" prop="name" :rules="FormValidator.checkStringLength(2, 50, '用户姓名', true, 'blur')">
          <el-input v-model.trim="form.name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户性别"  prop="gender" :rules="FormValidator.checkStringLength(1, 1, '用户性别', true, 'blur')">
        <el-select clearable filterable v-model="form.gender" class="w-full">
            <el-option value="0" label="女"></el-option>
            <el-option value="1" label="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式"  prop="phone" :rules="FormValidator.isPhone(true, '手机号','blur')" >
          <el-input v-model.trim="form.phone" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号"  prop="idCard" :rules="FormValidator.isIDCard(true, 'blur')" >
          <el-input v-model.trim="form.idCard" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户地址"  prop="address" :rules="FormValidator.checkStringLength(2, 50, '用户地址', true, 'blur')" >
          <el-input v-model.trim="form.address" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱"  prop="email" :rules="FormValidator.isEmail(true, '邮箱地址', 'blur')" >
          <el-input v-model.trim="form.email" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
      </el-form>
      </Dialog>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Ref } from 'vue-property-decorator';
import Table from '@/components/Table/index.vue';
import Dialog from '@/components/Dialog/index.vue';
import { getPage, setPage } from '@/utils/cookies';
import { FormValidator } from '@/utils/formValidator';
import { Form } from 'element-ui/types';
import moment from 'moment';
import { IForm } from './type'
import {
  getProjectListApi,
  delProjectApi,
  addProjectApi,
  updateProjectApi
} from '../../../../api/project'; // 导入接口
@Component({
  name: 'DidTaskList',
  components: { Table, Dialog }
})
export default class extends Vue {
  dialogFlag = false; // 控制打开弹框
  mode = ''; // 弹框的标题显示内容
  form = {
    name: '',
    gender: '' as any,
    phone: '',
    idCard: '',
    address: '',
    email: '',
    id: '',
    createTime: ''
  }; // form表单显示内容

  /**
   * 表格数据
   */
  list = [];
  total = 0;
  pageInfo = {
    pageSize: 10,
    pageIndex: 1,
    name: ''
  };

  userName = ''// 需要查询的用户姓名

 /**
   * 表单的ref
   */
 @Ref() readonly FormRef!: Form;
  /**
   * 验证器
   */
  public FormValidator = FormValidator;

  /**
   * 每条多少页
   */
  public size= 10;
  /**
   * 当前页面
   */
  public currentPage= 1;
  /**
   * 表头数据
   */
  get tableColumns () {
    return [
      {
        label: '用户姓名',
        prop: 'name'
      },
      {
        label: '用户性别',
        prop: 'gender'
      },
      {
        label: '联系方式',
        prop: 'phone'
      },
      {
        label: '身份证号',
        prop: 'idCard'
      },
      {
        label: '用户地址',
        prop: 'address'
      },
      {
        label: '邮箱地址',
        prop: 'email'
      },
      {
        label: '创建时间',
        prop: 'createTime'
      },

      {
        slot: 'action',
        width: 120
      }
    ];
  }

  created () {
    if ((getPage() as any) !== undefined) {
      this.pageInfo = JSON.parse(getPage() as any);
      this.size = this.pageInfo.pageSize
      this.currentPage = this.pageInfo.pageIndex
    }
  }

  beforeMount () {
    this.getList(this.pageInfo);
  }

  // 获取数据
  async getList (params: any) {
    const {
      data: { list, total }
    } = await getProjectListApi(params);
    this.list = list;
    this.total = total;
    this.list.forEach((item: any) => {
      item.gender === 1 ? (item.gender = '男') : (item.gender = '女');
    });
  }

  // 新增
  goCreate () {
    this.mode = 'add';
    this.dialogFlag = true;
  }

  // 编辑
  edit (e = {} as any) {
    this.mode = 'edit';
    Object.keys(this.form).forEach((key: string) => {
      this.form[key as keyof IForm] = e[key as keyof IForm]
    });
    this.dialogFlag = true;
  }

  // 查询
  async goQuery () {
    await this.getList({ ...this.pageInfo, name: this.userName });
    this.userName = '';
  }

  // 重置
  async goReset () {
    this.pageInfo = {
      pageSize: 10,
      pageIndex: 1,
      name: ''
    }
    await this.getList(this.pageInfo);
  }

  // 新增和编辑后关闭弹框
  closeDone () {
    // 验证通过再判断是新增还是编辑
    this.FormRef.validate(async (valide: boolean) => {
      if (valide) {
        this.form.gender === '男' ? (this.form.gender = 1) : (this.form.gender = 0);
        if (this.mode === 'add') {
          this.form.id = this.form.idCard;
          this.form.createTime = moment().format('YYYY-MM-DD  HH:mm');
          await addProjectApi(this.form);
        } else if (this.mode === 'edit') {
          await updateProjectApi(this.form);
        }
      }
    })
    this.done()
    this.getList(this.pageInfo);
  }

  // 关闭弹框、清空表单数据及验证规则、重新获取数据
  done () {
    this.dialogFlag = false;
    this.FormRef.resetFields()
    this.form = {
      name: '',
      gender: '',
      phone: '',
      idCard: '',
      address: '',
      email: '',
      id: '',
      createTime: ''
    }
  }

  // 删除
  del (e = {} as any) {
    this.$confirm(`确定要删除【${e.name}】用户？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await delProjectApi({ id: e.id });
      if (this.pageInfo.pageIndex > 1 && this.list.length <= 1) {
        this.pageInfo.pageIndex--;
      }
      this.getList(this.pageInfo);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    });
  }

  changeSize (size: number) {
    this.pageInfo.pageSize = size;
    this.size = size;
    this.getList({ pageSize: size, pageIndex: this.currentPage });
    setPage(this.pageInfo)
  }

  changePageIndex (pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex;
    this.currentPage = pageIndex;
    this.getList({ pageSize: this.size, pageIndex });
    setPage(this.pageInfo)
  }
}

</script>

<style lang='scss' scoped>
.page {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
::v-deep {
  .el-button {
    margin-left: 0;
  }
}
</style>
