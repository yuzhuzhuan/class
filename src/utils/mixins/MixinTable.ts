/** *******************************
 ************ Table **************
 ******************************** */
import { Vue, Component, Ref, Provide } from 'vue-property-decorator';
import { Route, RouteRecord } from 'vue-router';
import YkTable from '@/components/YK_Table/index.vue';
import YkTableButton from '@/components/YK_Table/YkTableButton.vue';
import { SaveBack } from '../decorators';
import { DialogCtrl } from './MixinDialog';
import { ElForm } from 'element-ui/types/form';

@Component({ components: { YkTable, YkTableButton } })
export default class MixinTable<T extends Record<string, any> & { id: any }> extends Vue {
  removeOK = false;
  // query
  queryForm: Record<string, any> = {};
  @Ref('queryForm') readonly $refQueryFormM!: ElForm;

  onQueryM(params?: Record<string, any>) {
    return this.$refTableM?.request(Object.assign({}, this.queryForm, params));
  }
  onResetM(pageInfo: Record<string, any>, params?: Record<string, any>) {
    if (this.$refQueryFormM) {
      this.$refQueryFormM.resetFields();
    }
    return this.$refTableM?.request(Object.assign({}, this.queryForm, params), pageInfo);
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
  async removeM(row: T, _index?: number, path?: string) {
    console.log('row', row, path);

    const { id } = row;

    // if (path?.includes('role')) {
    //   await serviceRole.remove({ id });
    // }
    // if (row.name) {
    //   await service.remove({ id });
    // } else if (row.departmentName) {
    //   await api.remove({ id });
    // } else {
    //   await this.removeRequestM({ id });
    // }
    this.removeRequestM({ id });
    this.onQueryM();
  }

  // NOTE 跳详情页时，记录当前pageNum
  private beforeRouteLeave(to: Route, from: Route, next: YkFunction) {
    const { sessionStorage } = window;
    if (to.fullPath.includes(from.fullPath)) {
      // /list => /list/:id
      // /list/list => /list/list/:id
      const fromRoute = from.matched[from.matched.length - 1];

      if (fromRoute && this.$refTableM) {
        sessionStorage.setItem(
          `${fromRoute.path}-pageIndex`,
          `${this.$refTableM.pageInfoMixin.pageIndex}`,
        );
        sessionStorage.setItem(
          `${fromRoute.path}-pageSize`,
          `${this.$refTableM.pageInfoMixin.pageSize}`,
        );
      }
    } else if (!from.fullPath.includes(to.fullPath)) {
      // /list/:id => /list
      from.matched.forEach((route: RouteRecord) => {
        sessionStorage.removeItem(`${route.path}-pageIndex`);
        sessionStorage.removeItem(`${route.path}-pageSize`);
      });
    }
    next();
  }
}
