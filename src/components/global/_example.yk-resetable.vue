<template>
  <div>
    <ElForm :model="submitForm" label-width="60px">
      <YkFormItem label="姓名" prop="name">
        <YkInput v-model="submitForm.name"></YkInput>
      </YkFormItem>
    </ElForm>
    <el-button type="primary" @click="resetSelf">点击刷新</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';

@Component
export default class ExampleYkResetable extends Vue {
  @Inject({
    default() {
      throw new Error('expect be wrapped by component "Resetable"');
    },
  })
  resetSelf!: YkFunction;

  submitForm = {
    name: '',
  };
}
</script>
