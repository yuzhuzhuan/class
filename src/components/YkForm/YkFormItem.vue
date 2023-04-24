<template>
  <ElFormItem
    ref="formItem"
    class="yk-form-item"
    v-bind="$attrs"
    :rules="rulesLocal"
    :label="!hideLabel ? label : ''"
    v-on="$listeners"
  >
    <template #label>
      <!-- @slot refer ElFormItem#label -->
      <slot name="label">
        <span v-if="hideLabel"></span>
      </slot>
    </template>
    <!-- @slot refer ElFormItem#default -->
    <slot></slot>
  </ElFormItem>
</template>
<script lang="ts">
import { VNode } from 'vue';
import { Component, Prop, Provide, Vue, Watch, Ref, Inject } from 'vue-property-decorator';
import { RuleItem } from 'asyncValidator';
import { Form, FormItem } from 'element-ui';

const actionMap = {
  select: '选择',
  input: '输入',
} as const;

/**
 * 封装 ElFormItem
 *
 * 将 placeholder、validator 属性化
 *
 * @see {@link https://element.eleme.cn/#/zh-CN/component/form#form-item-attributes}
 *
 */
@Component
export default class YkFormItem extends Vue {
  /**
   * 数据验证规则
   * @see {@link https://github.com/yiminghe/async-validator}
   */
  @Prop({ type: [Object, Array], required: false })
  rules?: RuleItem | RuleItem[];

  /**
   * 数据验证类型
   * @see {@link https://github.com/yiminghe/async-validator}
   */
  @Prop({ type: String, required: false })
  ruleType?: RuleItem['type'];

  /**
   * 用于 ElFormItem.label 和 表单组件的 placeholder 以及 validator 的 message
   */
  @Provide()
  @Prop({ type: String, required: false })
  label?: string;

  get hideLabel() {
    return (
      this.$attrs['label-width'] === '0' ||
      (!this.$attrs['label-width'] && this.FormInstance.labelWidth === '0')
    );
  }

  /**
   * 指定表单组件的操作类型，默认会自动识别，识别不出来的时默认 select
   */
  @Prop({ type: String, required: false })
  action?: 'select' | 'input';

  /**
   * 是否必填
   */
  @Prop({ type: Boolean, required: false, default: () => undefined })
  required?: boolean;

  get rulesLocal() {
    if (this.FormInstance.disabled) return [];
    const ruleList = [this.rules].flat().filter(Boolean);

    // 如果 required 必填
    if (this.required !== undefined) {
      ruleList.unshift({ required: this.required });
      const {
        message = this.placeholder,
        required = this.required,
        // type = this.ruleType,
        ...item
      } = ruleList[0] ?? {};
      ruleList[0] = { ...item, message, required };
    }
    if (this.ruleType) {
      const rule: RuleItem = {
        type: this.ruleType,
        message: this.placeholder,
      };
      if (this.ruleType === 'number') {
        rule.validator = function (_rule, value) {
          return typeof value === 'number' || value === ''
            ? []
            : [new Error((_rule as RuleItem).message)];
        };
      }
      ruleList.unshift();
    }
    return ruleList.map((item: RuleItem = {}) => {
      const { trigger = 'change', message: msg, ...other } = item;
      const message = msg ?? (item.required !== undefined ? this.placeholder : msg);
      return { ...other, trigger, message };
    });
  }

  @Inject({ from: 'elForm' })
  FormInstance!: Form;

  @Ref('formItem') readonly $refFormItem!: FormItem;
  @Watch('rulesLocal')
  onRuleChange() {
    this.$nextTick(() => (this.$refFormItem as any).validate('change'));
  }

  @Provide()
  get placeholder() {
    const ruleList = [this.rules].flat().filter(Boolean);
    const requiredMessage = ruleList[0]?.required && ruleList[0]?.message;
    if (requiredMessage) return requiredMessage;

    const tagType =
      this.action ??
      ((this.$slots as any)?.default[0] as VNode).componentOptions?.tag?.toLowerCase();
    const actionType = tagType && Object.keys(actionMap).find((item) => tagType.includes(item));

    // @ts-ignore: key 的对应
    return `请${actionMap[actionType ?? 'select']}${this.label ?? ''}`;
  }
}
</script>

<style lang="scss">
.grid {
  .yk-form-item {
    display: flex;
    white-space: nowrap;
    .el-form-item__label {
      flex-basis: auto;
    }
    .el-form-item__content {
      flex: 1;
    }
  }
}
</style>
