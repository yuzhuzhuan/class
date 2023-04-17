/* eslint-disable @typescript-eslint/member-ordering */
/** *******************************
 ************ Table **************
 ******************************** */
import { Vue, Component, Ref } from 'vue-property-decorator';
import { Route } from 'vue-router';
import YkTable from '@/components/YkTable/index.vue';
import YkTableButton from '@/components/YkTable/YkTableButton.vue';
import { SaveBack } from '../decorators';
import { DialogCtrl } from './MixinDialog';
import { ElForm } from 'element-ui/types/form';

@Component({ components: { YkTable, YkTableButton } })
export default class MixinTable<T extends Record<string, any> & { id: any }> extends Vue {
  // query
  queryFormM: Record<string, any> = {};
  @Ref('queryFormM') readonly $refQueryM?: ElForm;

  async onQueryM(params?: Record<string, any>) {
    const res = await this.$refTableM?.request(
      Object.assign({}, this.pageInfoM, this.queryFormM, params),
    );

    if (this.rememberM) {
      const data = { form: this.queryFormM, page: this.$refTableM?.pageInfo };
      window.sessionStorage.setItem(this.$route.path, JSON.stringify(data));
    }

    return res;
  }
  onResetM(params?: Record<string, any>) {
    if (this.$refQueryM) {
      this.$refQueryM.resetFields();
      this.pageInfoM = {};
    }
    return this.onQueryM(params);
  }

  // table
  @Ref('table') readonly $refTableM?: YkTable;
  tableSelectionM = [] as Array<T & { id: T['id'] }>;

  // dialog Edit
  dialogEditM = new DialogCtrl<T>();

  // aciton remove
  /* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
  removeRequestM = async function name(_params: { id: number | string }): Promise<any> {
    throw new Error(`请重写 ${'removeRequest'} 方法!`);
  };

  /* eslint-enable no-unused-vars, @typescript-eslint/no-unused-vars */
  // removeConfirmTip = ''
  /**
   * 删除
   * @param row
   */
  @SaveBack('删除成功')
  async removeM(
    row: T,
    _index?: number,
    confirmOpts: { message: string; descriptions?: string | string[] } = {
      message: '是否确认删除？',
      descriptions: [''],
    },
  ) {
    await this.$ykMsgbox.confirm('', confirmOpts);

    const { id } = row;
    this.removeRequestM({ id });

    const { dataList } = this.$refTableM as YkTable;
    let {
      pageInfo: { pageIndex = 1 },
    } = this.$refTableM as YkTable;
    if (pageIndex > 1 && dataList.length <= 1) {
      pageIndex = -1;
    }
    this.onQueryM({ pageIndex });
  }

  // 记忆查询条件
  rememberM = true;
  private pageInfoM: { pageIndex?: number; pageSize?: number } = {};
  private beforeRouteLeave(to: Route, from: Route, next: Function) {
    if (this.rememberM && !to.path.startsWith(this.$route.path)) {
      window.sessionStorage.removeItem(from.path);
    }
    next();
  }
  private beforeRouteEnter(to: Route, from: Route, next: Function) {
    next((vm: MixinTable<T>) => {
      if (vm.rememberM) {
        const { query, page } = JSON.parse(window.sessionStorage.getItem(to.path) || '{}');
        Object.assign(vm.queryFormM, query);
        Object.assign(vm.pageInfoM, page);
      }
    });
  }
}
