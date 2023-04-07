<template>
  <ElInputNumber
    v-if="number"
    :class="[className, 'w-auto']"
    :placeholder="ph"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <ElInput v-else :placeholder="ph" v-bind="$attrs" v-on="$listeners" :type="type">
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </ElInput>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';

@Component({ components: {}, inheritAttrs: false })
export default class YkFormInput extends Vue {
  @Inject({ from: 'placeholder', default: '' })
  placeholderInject?: string;

  @Prop({ type: String })
  placeholder?: string;

  get ph() {
    if (this.$attrs?.disabled === '' || this.$attrs?.disabled || this.FormInstance?.disabled)
      return '';
    return this.placeholder ?? this.placeholderInject;
  }

  @Inject({ from: 'elForm' })
  FormInstance!: Form;

  @Prop({ type: String, required: false })
  type?: string;

  @Prop({ type: String, required: false })
  className?: string;

  @Prop({ type: Boolean, required: false, default: false })
  number!: boolean;
}
</script>
