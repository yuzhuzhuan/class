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

@Component({ components: { Editor } })
export default class YkEditor extends Vue {
  @Model('change', { type: String }) readonly value!: string;

  @Emit('change')
  onChange(value: string) {
    return value;
  }

  initOpts = {
    selector: '#sp-tiny', // 富文本编辑器的id
    // skin: "oxide-dark",
    language: 'zh-Hans', // 语言包
    // 插件
    plugins:
      'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template  codesample table hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount  help  autosave autoresize formatpainter code  textpattern',
    // 工具条
    toolbar: ` undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \n' +
                     styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                     table image media  hr pagebreak insertdatetime print preview | fullscreen | lineheight formatpainter  code   textpattern`,
    height: 650, // 编辑器高度
    min_height: 400,
    /* content_css: [ //可设置编辑区内容展示的css，谨慎使用
                        '/static/reset.css',
                        '/static/ax.css',
                        '/static/css.css',
                    ], */
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
    link_list: [
      { title: '预置链接1', value: 'http://www.tinymce.com' },
      { title: '预置链接2', value: 'http://tinymce.ax-z.cn' },
    ],
    // 自定义异步函数
    image_list: async (success: any) => {
      // 可异步获取数据，获取到的数组放入success中
      success([
        { title: 'Dog', value: 'mydog.jpg' },
        { title: 'Cat', value: 'mycat.gif' },
        {
          title: 'Dogs',
          menu: [
            { title: 'Alaskan Husky', value: 'husky.jpg' },
            { title: 'Dingo', value: 'dingo.png' },
            { title: 'Swedish Lapphund', value: 'swedish_lapphund.gif' },
          ],
        },
      ]);
    },
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' },
    ],
    importcss_append: true,
    // 自定义文件选择器的回调内容
    // file_picker_callback: function (callback, value, meta) {
    //   if (meta.filetype === "file") {
    //     callback("https://www.baidu.com/img/bd_logo1.png", { text: "My text" });
    //   }
    //   if (meta.filetype === "image") {
    //     callback("https://www.baidu.com/img/bd_logo1.png", {
    //       alt: "My alt text",
    //     });
    //   }
    //   if (meta.filetype === "media") {
    //     callback("movie.mp4", {
    //       source2: "alt.ogg",
    //       poster: "https://www.baidu.com/img/bd_logo1.png",
    //     });
    //   }
    // },
    // 为内容模板插件提供预置模板
    templates: [
      { title: '模板1', description: '介绍文字1', content: '模板内容' },
      {
        title: '模板2',
        description: '介绍文字2',
        content:
          '<div class="mceTmpl"><span class="cdate">CDATE</span>，<span class="mdate">MDATE</span>，我的内容</div>',
      },
    ],
    // content_security_policy: "script-src *;",
    extended_valid_elements: 'script[*src]',
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
    toolbar_sticky: true,
    auto_focus: true,
  };

  async changeData(data: any) {
    // 过滤data，如果是文件夹，就放在数组最前面
    const arr = data.filter((item: any) => {
      return item.directory && item;
    });
    data.splice(data.length - arr.length, arr.length);
    data.unshift(...arr);
    return data;
  }
}
</script>

<style scoped></style>
