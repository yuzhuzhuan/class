/* eslint-disable @typescript-eslint/member-ordering */
import { Vue, Component, Prop, Model, Emit, Inject, Watch } from 'vue-property-decorator';
import { pick } from 'lodash-es';
import YkDialog from '@c/YkDialog/index.vue';

// 之所以使用 mixin 而不是再包裹一层是因为包裹后监听函数还是要手动绑定
@Component({ inheritAttrs: false, components: { YkDialog } })
export default class MixinDialog<T extends Record<string, any> | null = null, D = T> extends Vue {
  @Inject({
    default() {
      throw new Error('expect be wrapped by component "Resetable"');
    },
  })
  private resetSelf!: YkFunction;
  @Watch('value')
  private onVisibleChange(newValue: boolean) {
    if (!newValue) {
      this.$nextTick(() => this.resetSelf?.());
    }
  }

  /** @model */
  @Model('change', { type: Boolean, default: false }) private value!: boolean;

  get attrsM() {
    return Object.assign(
      {
        ref: 'dialog',
        onOk: this.onOk,
        visible: this.value,
      },
      this.$attrs,
    );
  }

  get listenersM() {
    return Object.assign(
      {
        'on-cancel': this.closeM,
        open: this.openM,
      },
      this.$listeners,
    );
  }

  get visibleM() {
    return this.value;
  }

  /**
   * 给弹窗传的数据
   */
  @Prop({ type: Object, required: false })
  private data?: D;
  get dataM() {
    return this.data;
  }

  dialogFormM: FormInit<T | null> = null;

  /**
   * 弹窗打开时的回调
   * <br/><br/>
   * 可以覆写，默认执行逻辑如下：
   *
   *     当 this.data.id && this.detailRequestM 时会自动调用 this.getDetailM(), 且将返回值应用于下一步的复制上
   *     当 this.data && this.dialogFormM 时会自动将 data 的属性值复制到对应的 dialogFormM 属性上
   * @public
   */
  async openM() {
    let data = this.dataM as any;
    if (data?.id && this.detailRequestM) {
      data = await this.getDetailM(data.id);
    }
    if (data && this.dialogFormM) {
      Object.assign(this.dialogFormM, pick(data, Object.keys(this.dialogFormM)));
    }
  }

  /**
   * 点击 ok 时的回调，其返回值将传递给 done 事件，完成后关闭窗口
   * <br/><br/>
   * 可以覆写，默认执行逻辑如下：
   *
   *     当 dialogFormM 被覆写值时，会自动调用 this.getFormDataM('dialogFormM')，并返回其值
   *
   * @returns {any} 事件 done 的参数
   *
   * @public
   */
  saveM() {
    return this.dialogFormM && this.getFormDataM<NonNullable<T>>('dialogFormM');
  }

  private async onOk() {
    const data = await this.saveM();
    this.closeM(data ?? null);
  }

  /**
   * 点击 ok 弹窗关闭后触发的事件
   * @property {any} data saveM 的返回值
   */
  @Emit('done')
  private done(data: T | null) {
    this.$message.success({ message: '保存成功', duration: 1000 });
    // 给父页面传递参数
    return data;
  }

  /**
   * 关闭窗口
   *
   * **不能覆写**
   *
   * @param {any} data 当 data == undefined 触发 cancel 事件，否则触发 done 事件(data 为参数)
   *
   * @public
   */
  closeM(data: T | null | undefined) {
    if (data !== undefined) this.done(data);
    else {
      /**
       * 点 cancel 时触发的事件
       */
      this.$emit('cancel');
    }

    /**
     * 弹窗关闭时触发
     * @property {boolean} visible false
     */
    this.$emit('change', false);
  }

  // 获取详情数据
  detailLoadingM = false;
  detailRequestM: ((params: { id: number | string }) => Promise<any>) | null = null;

  /**
   * 获取详情数据的调用方法
   *
   * **依赖 detailRequestM 的覆写值**
   *
   * **不建议覆写**
   *
   * @param {number} id 详情 id
   * @returns {any} 详情数据
   *
   * @public
   */
  async getDetailM(id: number): Promise<T> {
    if (!this.detailRequestM) {
      throw new Error(`请重写 ${'detailRequestM'} 方法!`);
    }
    this.detailLoadingM = true;
    const { data } = await this.detailRequestM({ id });
    this.$nextTick(() => {
      this.detailLoadingM = false;
    });
    return data;
  }
}

export class DialogCtrl<T = any> {
  visible = false;
  data = null as T | null;
  show = (row?: T) => {
    this.data = row ?? null;
    this.visible = true;
  };
}
