<template>
  <div class="app-container">
    <el-card shadow="never">
      <el-form  :inline="true">
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
      <YKtable
        :columns="tableColumns"
        :list="list"
        :totalNum="total"
        :pageInfo="pageInfo"
        @changeSize="changeSize"
        @changePageIndex="changePageIndex"
        @edit="edit"
        @del="del"
      ></YKtable>
      <YKAddDialog
      v-model="dialogFlag"
      :dialogFlag="dialogFlag"
      :mode="mode"
      :form="form"
      @close="closeDone"
      ></YKAddDialog>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Ref } from 'vue-property-decorator';
import YKtable from '@/components/YKtable/index.vue';
import YKAddDialog from './YKAddDialog.vue';
import { getPage, setPage } from '@/utils/cookies';
import { FormValidator } from '@/utils/formValidator';
import { Form } from 'element-ui/types';
import { IForm, Params } from './type'
import { getProjectListApi, delProjectApi } from '../../../../api/project'; // 导入接口
@Component({
  name: 'Table',
  components: { YKtable, YKAddDialog }
})
export default class extends Vue {
  /**
   * 控制打开弹框
   */
  dialogFlag = false
  /**
   * 弹框的标题显示内容
   */
  mode = ''
  /**
   * form表单显示内容
   */
  form = {
    name: '',
    gender: '' as any,
    phone: '',
    idCard: '',
    address: '',
    email: '',
    id: '',
    createTime: ''
  }

  /**
   * 表格数据
   */
  list = [] as object[]
  /**
   * 数据总量
   */
  total = 0;
  /**
   * 接口请求默认数据
   */
  pageInfo = {
    pageSize: 10,
    pageIndex: 1,
    name: ''
  }

  /**
   * 需要查询的用户姓名
   */
  userName = ''
 /**
   * 表单的ref
   */
 @Ref() readonly FormRef!: Form;
  /**
   * 验证器
   */
  public FormValidator = FormValidator;

  /**
   * 表头数据
   */
  get tableColumns () {
    return [
      {
        label: '用户姓名',
        prop: 'name',
        minWidth: '80'
      },
      {
        label: '用户性别',
        prop: 'gender',
        width: '100'
      },
      {
        label: '联系方式',
        prop: 'phone',
        width: '120'
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
        slot: 'action'
      }
    ];
  }

  // 获取用户选择的分页显示数量
  created () {
    if ((getPage() as string) !== undefined) {
      this.pageInfo = JSON.parse(getPage() as string);
    }
  }

  // 渲染前发请求获取数据
  beforeMount () {
    this.getList(this.pageInfo);
  }

  // 获取数据
  async getList (params: Params) {
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
  edit (e = {} as IForm) {
    this.mode = 'edit';
    Object.keys(this.form).forEach((key: string) => {
      this.form[key as keyof IForm] = e[key as keyof IForm]
    });
    this.dialogFlag = true;
  }

  // 查询
  async goQuery () {
    await this.getList({ pageSize: this.pageInfo.pageSize, pageIndex: 1, name: this.userName });
  }

  // 重置
  async goReset () {
    this.userName = ''
    this.pageInfo.pageSize = 1;
    this.pageInfo = {
      pageSize: 10,
      pageIndex: 1,
      name: ''
    }
    await this.getList(this.pageInfo);
  }

  // 关闭弹框
  closeDone () {
    this.dialogFlag = false;
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
    if (this.userName) this.pageInfo.name = this.userName
    this.getList(this.pageInfo);
  }

  // 删除
  del (e = {} as IForm) {
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

  // 每页显示条数改变
  changeSize (size: number) {
    this.pageInfo.pageSize = size;
    if (this.userName) {
      this.getList({ ...this.pageInfo, name: this.userName });
    } else {
      this.pageInfo.pageIndex = 1
      this.getList({ ...this.pageInfo });
    }
    setPage(this.pageInfo)
  }

  // 当前页数改变
  changePageIndex (pageIndex: number) {
    this.pageInfo.pageIndex = pageIndex;
    if (this.userName) {
      this.getList({ ...this.pageInfo, name: this.userName });
    } else {
      this.getList({ ...this.pageInfo });
    }
    setPage(this.pageInfo)
  }
}

</script>

<style lang='scss' scoped></style>
