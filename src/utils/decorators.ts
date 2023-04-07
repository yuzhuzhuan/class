import { createDecorator } from 'vue-class-component';
import { Message } from 'element-ui';
import { CreateElement } from 'vue';

// 保存后弹消息,然后返回
export const SaveBack = function (
  message: string | [string, string] = '保存成功',
  path: string | boolean = false,
  query?: any,
) {
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction;
    methods[handler] = async function (...args: any[]) {
      try {
        const data = await originalMethod.apply(this as any, args);
        const msgSuccess = [message].flat(1)[0];
        await new Promise((resolve) => {
          Message.success({
            message: msgSuccess,
            duration: 1000,
            onClose: () => resolve(null),
          });
        });

        path === true ? this.$router.go(-1) : path && this.$router.push({ path, query });

        return data;
      } catch (error) {
        const msgError = [message].flat(1)[1];
        msgError && Message.error({ message: msgError, duration: 3000 });
        throw error;
      }
    };
  });
};

// 为了弹多个 getForm(false) 的错误消息
export const MessageCatchError = function (message?: string) {
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction;
    methods[handler] = async function (...args: any[]) {
      try {
        const data = await originalMethod.apply(this as any, args);
        return data;
      } catch (error) {
        Message.error({
          message: message || (error as Error).message,
          duration: 3000,
        });
        throw error;
      }
    };
  });
};

// 执行前进行确认
export const ConfirmBefore = function (message: string, title?: string) {
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction;
    methods[handler] = async function (...args: any[]) {
      await this.$confirm(message, {
        title: title ?? '提示',
        type: 'warning',
        showClose: false,
      });
      const data = await originalMethod.apply(this as any, args);
      return data;
    };
  });
};

// 全屏 loading
export const ScreenLoading = function (loadingText?: string) {
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction;
    methods[handler] = async function (...args: any[]) {
      this.$Spin.show({
        render: (h: CreateElement) => {
          return h('div', [
            h('Icon', {
              class: 'demo-spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 18,
              },
            }),
            h('div', { class: 'offset-top' }, loadingText ?? '加载中'),
          ]);
        },
      });
      try {
        const data = await originalMethod.apply(this as any, args);
        this.$Ykin.hide();
        return data;
      } catch (error) {
        this.$Ykin.hide();
        throw error;
      }
    };
  });
};

// request loading
export const RequestLoading = function (loadingProp = 'loading') {
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction;

    componentOptions.data =
      componentOptions.data ??
      function () {
        return {};
      };
    const originalData = componentOptions.data as YkFunction<object>;
    componentOptions.data = function (...args: any[]) {
      const data = originalData.apply(this as any, args);
      return { ...data, [loadingProp]: false };
    };

    methods[handler] = async function (...args: any[]) {
      this[loadingProp] = true;
      try {
        const data = await originalMethod.apply(this as any, args);
        return data;
      } finally {
        this[loadingProp] = false;
      }
    };
  });
};
// 循环调用
export const LoopExcute = function (timeout = 3000) {
  let flag = true;
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction<boolean>;
    methods[handler] = async function (...args: any[]) {
      flag = await originalMethod.apply(this as any, args);
      if (flag) {
        setTimeout(async () => {
          flag && methods[handler].apply(this as any, args);
        }, timeout);
      }
    };

    // 页面销毁时，也销毁循环
    const originalBeforeDestroy = componentOptions.beforeDestroy;
    componentOptions.beforeDestroy = function () {
      originalBeforeDestroy && originalBeforeDestroy.apply(this as any);
      flag = false;
    };
  });
};
