<template>
  <ElFormItem
    ref="formItem"
    class="sp-form-item"
    v-bind="$attrs"
    v-on="$listeners"
    :rules="rulesLocal"
    :label="!hideLabel ? label : ''"
  >
    <template #label>
      <slot name="label">
        <span v-if="hideLabel"></span>
      </slot>
    </template>
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
  input: '输入'
} as any;

@Component
export default class YkFormItem extends Vue {
  @Prop({ type: [Object, Array], required: false })
  rules?: RuleItem | RuleItem[];

  @Prop({ type: String })
  ruleType?: RuleItem['type'];

  @Provide()
  @Prop({ type: String, required: false })
  label?: string;

  get hideLabel() {
    return this.$attrs['label-width'] === '0' || (!this.$attrs['label-width'] && this.FormInstance.labelWidth === '0');
  }

  @Prop({ type: String, required: false })
  action?: 'select' | 'input';

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
      const rule = {
        type: this.ruleType,
        message: this.placeholder
      } as RuleItem;
      if (this.ruleType === 'number') {
        rule.validator = function(rule, value) {
          return typeof value === 'number' || value === '' ? [] : [new Error((rule as RuleItem).message)];
        };
      }
      ruleList.unshift();
    }
    return ruleList.map((item = {} as RuleItem) => {
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

    const tagType = this.action ?? ((this.$slots as any)?.default[0] as VNode).componentOptions?.tag?.toLowerCase();
    const actionType = tagType && Object.keys(actionMap).find(item => tagType.includes(item));

    return `请${actionMap[actionType ?? 'select']}` + (this.label ?? '');
  }
}
</script>

<style lang="scss">
.grid {
  .sp-form-item {
    white-space: nowrap;
    display: flex;
    .el-form-item__label {
      flex-basis: auto;
    }
    .el-form-item__content {
      flex: 1;
    }
  }
}
</style>
