import { MessageBox } from 'element-ui';
import { ElMessageBoxOptions, MessageBoxData } from 'element-ui/types/message-box';
import Vue, { VueConstructor } from 'vue';
import './style.postcss';

// NOTE: 在线编译vue https://magiccwl.github.io/vue-compiler-online/
const colorList = ['warn', 'error', 'success', 'info', 'question'];

const getMessageNode = function (
  this: any,
  {
    message,
    descriptions,
    icon,
  }: {
    message: string;
    descriptions?: string | string[];
    icon: string;
  },
) {
  let iconType = '';
  if (icon) {
    colorList.forEach((item: string) => {
      if (icon.includes(item)) {
        iconType = item;
      }
    });
  }
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
              staticClass: `${iconType} text-[#ff9900] icon`,
              attrs: {
                icon: icon || 'mdi:question-mark-circle-outline',
              },
            }),
          ],
        ),
        this.$createElement('div', [
          this.$createElement(
            'p',
            {
              staticClass: 'font-bold text-base text-[#676666]',
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
  iconName?: string;
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
  title = options?.title || title || this.$ts('YkMessageBox.title');
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
                icon: options?.iconName,
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
