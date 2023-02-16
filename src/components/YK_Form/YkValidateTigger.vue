<!-- 无渲染组件 -->
<script lang="ts">
import { Component, Vue, Watch, Model, Inject } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { Form } from 'element-ui';

@Component
export default class YkValidateTigger extends Vue {
  // NOTE 还不是很方便，感觉要用高阶组件才行
  @Model('input', { required: true })
  private value!: Record<string, any>;

  @Watch('value')
  onValueChange(newValue: any, oldValue: any) {
    if (Array.isArray(newValue) || Array.isArray(oldValue)) {
      newValue = Array.isArray(newValue) ? newValue : [];
      oldValue = Array.isArray(oldValue) ? oldValue : [];
      if (newValue.length !== oldValue.length) {
        this.$formItem.onFieldChange();
      }
      return;
    }
    this.$formItem.onFieldChange();
  }

  @Inject()
  FormInstance!: Form;

  get $formItem(): any {
    return this.$parent;
  }

  render(createElement: CreateElement) {
    return createElement('div', {}, this.$slots.default);
  }
}
</script>
