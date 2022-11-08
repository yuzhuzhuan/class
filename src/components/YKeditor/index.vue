<template>
  <div>
    <Editor
      :disabled="false"
      :init="initOpts"
      initial-value=""
      plugins=""
      tag-name="div"
      toolbar=""
      :value="value"
      @input="onChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Model, Vue } from 'vue-property-decorator';
import Editor from '@tinymce/tinymce-vue';
// import * as api from '@/pages/file/service';
/* eslint-disable */
@Component({ components: { Editor } })
export default class extends Vue {
  @Model('change', { type: String }) readonly value!: string;

  @Emit('change')
  onChange (value: string) {
    return value;
  }

  initOpts = {
    selector: '#sp-tiny', // 富文本编辑器的id
    // skin: 'oxide-dark',
    language: 'zh-Hans', // 语言包
    // 插件
    plugins:
      ' preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template  codesample table  pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  help  autosave autoresize  code ',
    // 工具条
    toolbar:
      ' undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media   pagebreak insertdatetime  preview | fullscreen | lineheight   code ',
    height: 650, // 编辑器高度
    min_height: 400,
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
    image_list: async function (success: any) {
      success([
        { title: 'dog  ', value: 'dog.jpg' },
        { title: 'cat', value: 'cat.jpg' }
      ]);
    },
    // 为内容模板插件提供预置模板
    templates: [
      {
        title: '公司简介',
        description: '介绍文字2',
        content: '你好吗'
      },
      {
        title: '企业价值观',
        description: '介绍文字3',
        content: 'buhaoyou'
      }
    ],
    // content_security_policy: 'script-src *;',
    extended_valid_elements: '*[*]',
    //
    template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
    autosave_ask_before_unload: false,
    toolbar_mode: 'wrap',
    automatic_uploads: false,
    images_upload_base_path: '/demo',
    // images_upload_handler: function (blobInfo, succFun, failFun) {
    //   succFun("/demo/images/img.jpg");
    // },
    // icons:'ax-color',
    convert_urls: false,
    toolbar_sticky: true
  };

  async changeData (data: any) {
    // 过滤data，如果是文件夹，就放在数组最前面
    const arr = data.filter((item: any) => {
      if (item.directory) {
        return item;
      }
    });
    data.splice(data.length - arr.length, arr.length);
    data.unshift(...arr);
    return data;
  }
}
</script>

<style scoped></style>
