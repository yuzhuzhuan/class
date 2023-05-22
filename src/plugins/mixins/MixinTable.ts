/* eslint-disable @typescript-eslint/member-ordering */
import { Vue, Component, Ref } from 'vue-property-decorator';
import { Route } from 'vue-router';
import YkTable from '@/components/YkTable/index.vue';
import YkTableButton from '@/components/YkTable/YkTableButton.vue';
import { SaveBack } from '@/utils/decorators';
import { DialogCtrl } from './MixinDialog';
import { ElForm } from 'element-ui/types/form';

@Component({ components: { YkTable, YkTableButton } })
export default class MixinTable<T extends Record<string, any> & { id: any }> extends Vue {
  /** ElForm[model=queryFormM] 的 model 值 */
  queryFormM: Record<string, any> = {};
  /** ElForm[ref=queryFormM] 的 Ref 实例 */
  @Ref('queryFormM') readonly $refQueryM?: ElForm;

  /**
   * 手动刷新表格内容(调用 dataRequest 或者应用 data 数据)，并将 queryFormM 传给 dataRequest
   * @public
   * @param {?Record<string, any>} params 给 dataRequest 参数
   * @returns {{data:RowData[],total:number}} 调用 dataRequest 的返回值
   */
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

  /**
   * 重置 $refQueryM 内容，并刷新 YkTable
   * @param {?Record<string, any>} params 给 onQueryM 参数
   * @returns onQueryM 的返回值
   * @public
   */
  onResetM(params?: Record<string, any>) {
    if (this.$refQueryM) {
      this.$refQueryM.resetFields();
      this.pageInfoM = {};
    }
    return this.onQueryM(params);
  }

  /** YkTable[ref=table] 的 Ref 实例 */
  @Ref('table') readonly $refTableM?: YkTable;

  /** 编辑弹窗的控制项 */
  dialogEditM = new DialogCtrl<T>();

  /**
   * 删除行数据的接口<br/>
   * **如果使用必须覆写**
   * @param {{id:number|string}} _params 接口的参数
   * @public
   */
  removeRequestM = async function name(_params: { id: number | string }): Promise<any> {
    throw new Error(`请重写 ${'removeRequestM'} 方法!`);
  };

  /**
   * 删除 YkTable 行数据
   * @public
   * @param {T} row 行数据
   * @param {?number} [_index] 行号
   * @param {({ message: string; descriptions?: string | string[] })} [confirmOpts={
        message: this.$ts('YkMessageBox.message'),
        descriptions: [''],
      }] 删除前的确认弹窗配置
   * @returns void
   */
  @SaveBack('删除成功')
  async removeM(
    row: T,
    _index?: number,
    confirmOpts: { message: string; descriptions?: string | string[] } = {
      message: this.$ts('YkMessageBox.message'),
      descriptions: [''],
    },
  ) {
    await this.$ykMsgbox.confirm('', confirmOpts);

    const { id } = row;
    await this.removeRequestM({ id });

    const { dataList } = this.$refTableM as YkTable;
    let {
      pageInfo: { pageIndex = 1 },
    } = this.$refTableM as YkTable;
    if (pageIndex > 1 && dataList.length <= 1) {
      pageIndex = -1;
    }
    this.onQueryM({ pageIndex });
  }

  /** 是否记忆查询条件 queryFormM 的值 */
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
