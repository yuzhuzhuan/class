import { MessageBox } from 'element-ui';
import { ElMessageBoxOptions, MessageBoxData } from 'element-ui/types/message-box';
import Vue, { VueConstructor } from 'vue';
import './style.postcss';

// NOTE: 在线编译vue https://magiccwl.github.io/vue-compiler-online/

const getMessageNode = function (
  this: any,
  {
    message,
    descriptions,
  }: {
    message: string;
    descriptions?: string | string[];
  },
) {
  const descriptionsList = [descriptions].flat();
  const msgNode = this.$createElement('div', {}, [
    this.$createElement(
      'div',
      {
        staticClass: 'flex',
      },
      [
        this.$createElement(
          'div',
          {
            staticClass: 'mr-2 ml-4',
          },
          [
            this.$createElement('yk-icon', {
              staticClass: 'text-[#ff9900] icon',
              attrs: {
                icon: 'mdi:question-mark-circle-outline',
              },
            }),
          ],
        ),
        this.$createElement('div', [
          this.$createElement(
            'p',
            {
              staticClass: 'font-600 text-base text-[#676666]',
            },
            [message],
          ),
          ...descriptionsList.map((desc) => {
            return this.$createElement(
              'p',
              {
                staticClass: 'text-[#ababab] text-sm',
              },
              [desc],
            );
          }),
        ]),
      ],
    ),
  ]);

  return msgNode;
};
interface YkMessageBoxOptions extends ElMessageBoxOptions {
  descriptions?: string | string[];
}
interface YkMessageBoxShortcutMethod {
  (message: string, title: string, options?: YkMessageBoxOptions): Promise<MessageBoxData>;
  (message: string, options?: YkMessageBoxOptions): Promise<MessageBoxData>;
}
const confirm = function (this: any, message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  const msg = options?.message || message;
  title = options?.title || title || this.$t('YkMessageBox.title');
  return MessageBox.confirm(
    message,
    title,
    Object.assign({}, options, {
      customClass: 'yk-message-box',
      title,
      message:
        typeof msg === 'string'
          ? Reflect.apply(getMessageNode, this, [
              {
                message: msg,
                descriptions: options?.descriptions,
              },
            ])
          : msg,
    }),
  );
} as YkMessageBoxShortcutMethod;

export const YkMessageBox = { confirm };

const $YkMessageBox = {
  install: (vue: VueConstructor) => {
    vue.prototype.$ykMsgbox = YkMessageBox;
    let isBind = false;
    vue.mixin({
      created(this: Vue) {
        if (!isBind) {
          YkMessageBox.confirm = YkMessageBox.confirm.bind(this.$root);
          isBind = true;
        }
      },
    });
  },
};

Vue.use($YkMessageBox);
