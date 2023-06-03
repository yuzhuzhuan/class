<template>
  <ElInputNumber
    v-if="number"
    :class="[customClass, 'w-auto']"
    :placeholder="ph"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <ElInput v-else :placeholder="ph" v-bind="$attrs" :type="type" v-on="$listeners">
    <template slot="append">
      <!-- @slot refer ElInput#append -->
      <slot name="append"></slot>
    </template>
  </ElInput>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';

/**
 * 封装 ElInput 和 ElInputNumber
 *
 * @see { @link https://element.eleme.cn/#/zh-CN/component/input }
 */
@Component({ components: {}, inheritAttrs: false })
export default class YkInput extends Vue {
  @Inject({ from: 'placeholder', default: '' })
  placeholderInject?: string;

  /**
   * 指定 placeholder, 覆盖继承自 YkFormItem 的 placeholder
   */
  @Prop({ type: String, required: false })
  placeholder?: string;

  get ph() {
    if (this.$attrs?.disabled === '' || this.$attrs?.disabled || this.FormInstance?.disabled)
      return '';
    return this.placeholder ?? this.placeholderInject;
  }

  @Inject({ from: 'elForm', default: null })
  FormInstance?: Form;

  /**
   * refer ElInput.type
   */
  @Prop({ type: String, required: false })
  type?: string;

  /**
   * 传给 ElInputNumber 的 class, 默认覆盖掉 number 组件的定宽
   */
  @Prop({ type: String, required: false })
  customClass?: string;

  /**
   * 是否渲染 ElInputNumber, 默认 ElInput
   */
  @Prop({ type: Boolean, required: false, default: false })
  number!: boolean;
}
</script>
