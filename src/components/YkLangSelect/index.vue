<template>
  <el-dropdown
    id="language"
    class="hover-effect"
    size="medium"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div class="flex items-center">
      <yk-icon icon="carbon:ibm-watson-language-translator" class="language"></yk-icon>
    </div>
    <el-dropdown-menu slot="dropdown" class="dropdownPop">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        <span style="display: block">中文</span>
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        <span style="display: block">English</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';

@Component({
  name: 'echarts',
})
export default class YkEcharts extends Vue {
  get language() {
    return AppModule.Language;
  }
  handleSetLanguage(lang: string) {
    this.$i18n.locale = lang;
    AppModule.setLANGUAGE(lang);
    this.$message({
      message: 'Switch Language Success',
      type: 'success',
    });
  }
}
</script>
<style lang="scss">
.language {
  font-size: 28px;
}
</style>
