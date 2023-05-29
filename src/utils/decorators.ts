import { createDecorator } from 'vue-class-component';
import { Message } from 'element-ui';
import { CreateElement } from 'vue';

/**
 * 保存后弹 success 消息,然后跳转路由
 * @param message 消息内容
 * @param path 要跳转的路由
 * @returns
 */
export const SaveBack = function (
  message: string | [string, string] = '保存成功',
  path?: string | { path: string; query?: object } | -1,
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

        if (path) {
          path === -1 ? this.$router.go(-1) : this.$router.push(path);
        }

        return data;
      } catch (error) {
        const msgError = [message].flat(1)[1];
        msgError && Message.error({ message: msgError, duration: 3000 });
        throw error;
      }
    };
  });
};

/**
 * 捕获 Error 并弹出错误消息
 * @param message 消息内容
 * @returns
 */
export const MessageCatchError = function (message?: string) {
  return createDecorator((componentOptions, handler) => {
    const methods = componentOptions.methods as any;
    const originalMethod = methods[handler] as YkFunction;
    methods[handler] = async function (...args: any[]) {
      try {
        const data = await originalMethod.apply(this as any, args);
        return data;
      } catch (error) {
        console.error(error);
        Message.error({
          message: message || (error as Error).message,
          duration: 3000,
        });
        throw error;
      }
    };
  });
};

/**
 * 执行前进行 warning 确认
 * @param message 确认内容
 * @param title 确认标题
 * @returns
 */
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

/**
 * 异步方法执行的时候弹全屏 loading
 * @param loadingText loading 的文本
 * @returns
 */
export const ScreenLoading = function (loadingText = '加载中') {
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
            h('div', { class: 'offset-top' }, loadingText),
          ]);
        },
      });
      try {
        const data = await originalMethod.apply(this as any, args);
        return data;
      } finally {
        this.$Ykin.hide();
      }
    };
  });
};

/**
 * 异步请求的前后，设置 loading
 * @param loadingProp loading 变量名
 * @returns
 */
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
/**
 * 循环调用，目标函数返回 true 时继续循环，否则 stop
 * @param timeout 时间间隔
 * @returns
 */
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
