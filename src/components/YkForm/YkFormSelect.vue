<template>
  <ElSelect
    :placeholder="ph"
    v-bind="$attrs"
    :value="_value"
    :disabled="disabled"
    @change="onChange"
  >
    <ElOption v-if="labelAll" key="sp-select-all-option" :value="blankOptValue" :label="labelAll" />
    <slot>
      <ElOption v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
    </slot>
  </ElSelect>
</template>
<script lang="ts">
import { Form } from 'element-ui';
import { Component, Emit, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class YkFormSelect extends Vue {
  @Inject({ from: 'placeholder', default: '' })
  placeholderInject?: string;

  @Prop({ type: String, required: false })
  placeholder?: string;

  @Prop({ type: Array, default: () => [] })
  options!: Array<{ value: string | number; label: string }>;

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

  @Emit('change')
  onChange(value: any) {
    return this.labelAll && value === this.blankOptValue ? '' : value;
  }

  @Prop({ type: [Boolean, String], default: false }) all!: boolean | string;
  blankOptValue = 'sp-select-all-option-value';
  @Inject({ from: 'label', default: '' })
  labelInject?: string;

  get labelAll() {
    return (
      this.all !== false &&
      (this.optionsCount > 0 || this.options?.length) &&
      `全部${typeof this.all !== 'boolean' ? this.all : ''}`
    );
  }

  @Prop({ type: Boolean, default: false })
  selectOnlyOne!: boolean;

  @Inject({ from: 'elForm' })
  FormInstance!: Form;

  private keepListen = true;
  private optionsCount = 0;
  @Watch('options', { immediate: true })
  onOptionsChange() {
    if (!this.keepListen) return this.keepListen;

    if (!this.selectOnlyOne || (this.$attrs.value ?? '') !== '' || this.optionsCount > 1) {
      this.keepListen = false;
      return this.keepListen;
    }

    if (this.optionsCount === 1) {
      if (this.options) {
        this.onChange(this.options[0]?.value ?? '');
      } else {
        const onlyChild = this.$slots.default?.[0];
        const propsData = onlyChild?.componentOptions?.propsData as any;
        this.onChange(propsData?.value ?? '');
      }

      this.keepListen = false;
      return this.keepListen;
    }
  }

  mounted() {
    this.optionsCount = this.options?.length ?? this.$slots.default?.length ?? 0;
    this.keepListen && this.onOptionsChange();
  }

  updated() {
    this.optionsCount = this.options?.length ?? this.$slots.default?.length ?? 0;
    this.keepListen && this.onOptionsChange();
  }
}
</script>
