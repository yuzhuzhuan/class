import { Form } from 'element-ui';
import { Vue, Component } from 'vue-property-decorator';
import * as ykOpts from '@/constants/options';
// import * as Permit from '@/services/api'

import MixinDialog from './MixinDialog';
import MixinTable from './MixinTable';
// import { StoreRole } from '@/store'
export { MixinDialog, MixinTable };

// 全局注入
@Component
export default class MixinGlobal extends Vue {
  // get userInfo() {
  //   return StoreRole.userInfo
  // }

  // 权限
  // get hasPermit() {
  //   return StoreRole.hasPermit
  // }
  // permit = Permit

  ykOpts = ykOpts;

  /**
   * 请给 ElForm 组件添加 ref
   *
   * 内置值 submitForm,dialogForm,queryForm
   *
   * **ElForm 组件的 mode 值需要绑定与 ref 相同名称的变量**
   * @param  {String|Boolean}  formRef  <br/>—String: el-from[ref=formRef][model=formRef]<br/>—Boolean: validation=fromRef,fromRef='submitForm'
   * @param  {Boolean|String} validation  <br/>—Boolean: 是否显示校验消息<br/>—String: 显示校验消息，并指定消息内容
   * @return {Object}   formData
   * @public
   */
  getFormDataM<T extends Record<string, any>>(
    formRef: string | boolean = 'submitForm',
    validation: boolean | string = true,
  ): Promise<T> | never {
    if (typeof formRef === 'boolean') {
      validation = formRef;
    }
    const formTypes = [
      typeof formRef === 'string' ? formRef : 'submitForm',
      'submitForm',
      'dialogForm',
      'queryForm',
    ];
    const selectedFormName = formTypes.find((name) => this.$refs[name]) || '';

    if (!selectedFormName) {
      throw new Error(`Component ${selectedFormName} cannot be found`);
    }

    return new Promise<T>((resolve, reject) => {
      (this.$refs[selectedFormName] as Form).validate(async (valid, ...rest: any[]) => {
        let errMessage = typeof validation === 'string' ? validation : '表单验证不通过';

        if (valid) {
          try {
            resolve(Object.assign({}, (this as any)[selectedFormName]));
          } catch (err) {
            errMessage = (err as Error)?.message || errMessage;
            reject(new Error(errMessage));
          }
        } else {
          validation &&
            this.$message.error({
              duration: 5000,
              message: errMessage,
            });
          reject(new Error(errMessage));
          // reject(new Error(rest?.length ? JSON.stringify(rest) : errMessage))
        }
      });
    });
  }
}
Vue.mixin(MixinGlobal);
