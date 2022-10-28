<template>
  <div class="app-container">
    <div class="flex article h-full" >
       <div class="pt-5 px-4 bg-white">
        <el-tree
          class="h-full min-w-50"
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="[0]"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
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
        :data="data"
        @add="addData"
        @edit="editData"
        @close="closeDone"
      ></Dialog>
    </el-card>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Table from '@/components/Table/index.vue';
import Dialog from '@/components/Dialog/index.vue';
import { getPage, setPage } from '@/utils/cookies';
import moment from 'moment';
import { UserData } from '../useComponent/type'
import { getDepApi } from '../../../../api/department'; // 导入接口
import { getProjectListApi } from '../../../../api/project'; // 导入接口
@Component({
  name: 'DidTaskList',
  components: { Table, Dialog }
})
export default class extends Vue {
  dialogFlag = false; // 控制打开弹框
  // dialogData= [] as any;
  mode = ''; // 弹框的标题显示内容
  data = {} as UserData; // 传给弹框的内容
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

  // 树形组件
  defaultProps = {
    children: 'children',
    label: 'label'
  };

// 树形组件显示内容
treeData=[
  {
    id: 1,
    name: '人事'
  }
]

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
    // const {
    //   data: { list, total }
    // } = await getDepApi(params);
    const res = await getProjectListApi(params)
    console.log(res);
    // this.list = list;
    // this.total = total;
    // this.list.forEach((item: any) => {
    //   item.gender === 1 ? (item.gender = '男') : (item.gender = '女');
    // });
  }

  // 根据部门查询
  async handleNodeClick () {
    console.log('handleNodeClick');
  }

  // 新增
  goCreate () {
    this.mode = 'add';
    this.dialogFlag = true;
  }

  // 编辑
  edit (e = {} as any) {
    this.mode = 'edit';
    this.data = e;
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

  // 新增数据
  async addData (e = {} as any) {
    e.gender === '男' ? (e.gender = 1) : (e.gender = 0);
    e.id = e.idCard;
    e.createTime = moment().format('YYYY-MM-DD  HH:mm');
    // await addProjectApi(e);
  }

  // 编辑数据
  async editData (e = {} as any) {
    e.gender === '男' ? (e.gender = 1) : (e.gender = 0);
    // await updateProjectApi(e);
    this.getList(this.pageInfo);
  }

  // 关闭弹框
  closeDone () {
    this.dialogFlag = false;
    this.getList(this.pageInfo);
  }

  // 删除
  del (e = {} as any) {
    this.$confirm(`确定要删除【${e.name}】用户？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      // await delProjectApi({ id: e.id });
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
