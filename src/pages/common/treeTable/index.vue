<template>
    <div class="app-container">
        <el-card shadow="never">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="14">
                        <el-form-item>
                            <el-button type="primary" @click="goCreate">新增用户</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <YKtable :columns="tableColumns" :list="list" @edit="edit" @del="del"></YKtable>
            <YKAddDialog v-model="dialogFlag" :dialogFlag="dialogFlag" :data="dialogData" :val="form.pid" :mode="mode" :form="form" @close="closeDone">
            </YKAddDialog>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import YKtable from '@/components/YK_Table/index.vue';
import YKAddDialog from './YKAddDialog.vue';
import { IForm, IDialogData, IList } from './type';
import { getDepListApi, deleteDepartmentApi } from '../../../../api/department'; // 导入接口
@Component({
  components: { YKtable, YKAddDialog }
})
export default class TreeTable extends Vue {
  /**
   * 控制打开弹框
   */

  dialogFlag = false;
  /**
   * 弹框的标题显示内容
   */
  mode = '';

  /**
   * form表单显示内容
   */
  form = {} as IForm;
  /**
   * 部门名称
   */
  dialogData = [] as IDialogData[];

  /**
   * 表格数据
   */
  list = [] as IList[];

  /**
   * 表头数据
   */
  get tableColumns () {
    return [
      {
        label: '部门名称',
        prop: 'name'
      },
      {
        label: '主管名称',
        prop: 'manager'
      },
      {
        label: '部门介绍',
        prop: 'introduce'
      },
      {
        label: '部门邮箱',
        prop: 'email'
      },
      {
        label: '成立时间',
        prop: 'createTime'
      },
      {
        slot: 'action'
      }
    ];
  }

  // 获取数据
  created () {
    this.getList();
  }

  // 获取数据
  async getList () {
    const {
      data: { list }
    } = await getDepListApi();
    //  栏目列表信息
    this.dialogData = [
      {
        id: 0,
        label: '顶级栏目',
        pid: 0
      }
    ];
    console.log('list', list);
    if (list) {
      list.map((item: IList) => {
        item.label = item.name;
        if (item.children) {
          item.children.map((child: IList) => {
            child.label = child.name;
          });
        }
      });
      this.list = list;
      //  栏目列表信息
      this.dialogData = [
        {
          id: 0,
          label: '顶级部门',
          children: [...this.list],
          pid: 0
        }
      ];
    }
  }

  // 关闭弹框
  closeDone () {
    this.dialogFlag = false;
    this.form = {} as IForm;
    this.getList();
  }

  // 新增
  goCreate () {
    this.mode = 'add';
    this.dialogFlag = true;
    this.form.pid = null;
  }

  // edit
  edit (e = {} as IForm) {
    this.mode = 'edit';
    this.form = { ...e };
    this.dialogFlag = true;
  }

  // del
  del (e = {} as IForm) {
    this.$confirm(`确定要删除【${e.name}】？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await deleteDepartmentApi({ id: e.id });
      this.getList();
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    });
  }
}
</script>

<style lang='scss' scoped></style>
