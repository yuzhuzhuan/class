/** *******************************
 ************ Dialog *************
 ******************************** */
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import YkDialog from '@c/YkDialog/index.vue';

// 之所以使用 mixin 而不是再包裹一层是因为包裹后监听函数还是要手动绑定
@Component({ inheritAttrs: false, components: { YkDialog } })
export default class MixinDialog<T = Record<string, never>, D = T> extends Vue {
  @Model('change', { type: Boolean, default: false }) private value!: boolean;

  get attrsM() {
    return Object.assign(
      {
        ref: 'dialog',
        onOk: this.okM,
        visible: this.value,
      },
      this.$attrs,
    );
  }

  get listenersM() {
    return Object.assign(
      {
        'on-cancel': this.closeM,
        open: this.open,
      },
      this.$listeners,
    );
  }

  get visibleM() {
    return this.value;
  }

  @Prop({ type: Object, required: false })
  data?: D;

  dialogForm: FormInit<T> = {};
  open() {
    if (this.data && this.dialogForm) Object.assign(this.dialogForm, this.data);
  }

  save() {
    this.closeM();
  }

  private async okM() {
    const data = await this.save();
    this.closeM((data as any) ?? null);
  }

  @Emit('done')
  private doneM(data: T) {
    this.$message.success({ message: '保存成功', duration: 1000 });
    // 给父页面传递参数
    return data;
  }

  @Emit('change')
  closeM(data?: T) {
    data !== undefined ? this.doneM(data) : this.$emit('cancel');
    return false;
  }

  // 获取详情数据
  detailLoadingM = false;
  detailRequestM = async function name(_params: { id: number | string }): Promise<any> {
    throw new Error(`请重写 ${'detailRequestM'} 方法!`);
  };

  async getDetailM(id: number): Promise<T> {
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
