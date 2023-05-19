<template>
  <ElSelect
    :placeholder="ph"
    v-bind="$attrs"
    :value="_value"
    :disabled="disabled"
    @change="onChange"
  >
    <ElOption v-if="labelAll" key="yk-select-all-option" :value="blankOptValue" :label="labelAll" />
    <!-- @slot refer ElSelect#default -->
    <slot>
      <ElOption
        v-for="item in options || []"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </slot>
  </ElSelect>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form } from 'element-ui';
/**
 * 封装 ElSelect
 *
 * @see { @link https://element.eleme.cn/#/zh-CN/component/select }
 */
@Component({ components: {}, inheritAttrs: false })
export default class YkSelect extends Vue {
  @Inject({ from: 'placeholder', default: '' })
  placeholderInject?: string;

  /**
   * 指定 placeholder, 覆盖继承自 YkFormItem 的 placeholder
   */
  @Prop({ type: String, required: false })
  placeholder?: string;

  /**
   * 选项，也可以直接使用 slot:ElOption
   */
  @Prop({ type: Array, required: false })
  options?: Array<{ value: string | number; label: string }>;

  get ph() {
    if (this.disabled) return '';
    return this.placeholder ?? this.placeholderInject;
  }

  get disabled() {
    return this.$attrs?.disabled === '' || this.$attrs?.disabled || this.FormInstance?.disabled;
  }

  @Model('change', { type: [String, Number], default: () => '' })
  value!: string;

  private get _value() {
    return this.labelAll && this.value === '' ? this.blankOptValue : this.value;
  }

  /**
   * 选中值发生变化时触发
   *
   * @property {string | number} 目前的选中值
   */
  @Emit('change')
  onChange(value: string | number) {
    return this.labelAll && value === this.blankOptValue ? '' : value;
  }

  /**
   * 是否自动添加选项“全部”
   *
   * 当 options.length=0 时，不显示
   */
  @Prop({ type: [Boolean, String], default: false }) //
  all!: boolean | string;

  private blankOptValue = 'yk-select-all-option-value';

  @Inject({ from: 'label', default: '' })
  labelInject?: string;

  get labelAll() {
    return (
      this.all !== false &&
      this.optionsCount > 0 &&
      `全部${typeof this.all !== 'boolean' ? this.all : ''}`
    );
  }
  /**
   * 当 options.length=1 时，是否自动选择
   */
  @Prop({ type: Boolean, default: false })
  selectOnlyOne!: boolean;

  @Inject({ from: 'elForm', default: null })
  FormInstance?: Form;

  private get optionsCount() {
    return this.options?.length ?? this.$slots.default?.length ?? 0;
  }
  @Watch('optionsCount', { immediate: true })
  onOptionsChange(newValue: number) {
    if (this.selectOnlyOne && newValue === 1 && (this.$attrs.value ?? '') === '') {
      if (this.options?.[0]) {
        this.onChange(this.options[0]?.value ?? '');
      } else {
        const onlyChild = this.$slots.default?.[0];
        const propsData = onlyChild?.componentOptions?.propsData as any;
        this.onChange(propsData?.value ?? '');
      }
    }
  }
}
</script>
