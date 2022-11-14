<template>
    <div class="app-container">
        <h1 class="text-center">Icon组件</h1>
        <div class="min-w-300 min-h-140  text-center grid inline-grid grid-cols-8 mt-10">
          <div  v-for="(item,index) in iconList" :key="index" class="mb-10">
             <SpIcon
            :icon="item"
            class="text-2xl"
          />
          <p class="text-xl">{{item}}</p>
         </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import SpIcon from '@/components/global/SpIcon.vue'// svg组件
import { listIcons } from '@iconify/vue2'

@Component({
  name: 'home',
  components: { SpIcon }
})
export default class extends Vue {
  iconList = listIcons()

  async created () {
    console.log(listIcons('', 'mdi'));
    /*
    listIcons() 列出可用图标，返回字符串[]
    函数有两个可选参数
    provider, string. 仅列出来自一个API提供者的图标.
    prefix, string. 仅列出具有特定前缀的图标。如果设置了前缀，则还必须设置提供程序（对于iconify公共API提供程序的值为空字符串）.

    */
  }
}
</script>
