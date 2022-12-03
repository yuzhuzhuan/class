import { Form } from 'element-ui';
import { Vue, Component } from 'vue-property-decorator';
// import * as spOpts from '@/constants/opts';
// import * as Permit from '@/services/api'

import MixinDialog from './MixinDialog';
import MixinTable from './MixinTable';
// import { StoreRole } from '@/store'
export { MixinDialog, MixinTable };

/*********************************
 ************ Global *************
 *********************************/
// 全局注入
@Component
class GlobalMixin extends Vue {
  // get userInfo() {
  //   return StoreRole.userInfo
  // }

  // 权限
  // get hasPermit() {
  //   return StoreRole.hasPermit
  // }
  // permit = Permit

  // spOpts = spOpts;

  // 组件自定义验证
  async validateM() {
    // console.log('在组件中实现, 可选')
  }

  /**
   * 请给 el-form 组件添加ref, 内置 submitForm,dialogForm,queryForm
   * el-form 组件的 mode 值需要绑定与ref相同名称的变量
   * @param  {Boolean|message} validation  是否显示校验结果
   * @param  {String}  formRef  el-from[ref] & VNode[formRef]
   * @return {Object}   formData
   */
  getFormDataM<T extends Record<string, any>>(validation: boolean | string = true, formRef = 'submitForm'): Promise<T> | never {
    const formTypes = [formRef, 'submitForm', 'dialogForm', 'queryForm'];
    const selectedFormName = formTypes.find(name => this.$refs[name]) || '';

    if (!selectedFormName) {
      throw new Error('Component ' + selectedFormName + ' cannot be found');
    }

    return new Promise<T>((resolve, reject) => {
      (this.$refs[selectedFormName] as Form).validate(async (valid, ...rest: any[]) => {
        let errMessage = typeof validation === 'string' ? validation : '表单验证不通过';

        if (valid) {
          try {
            await this.validateM?.();
            resolve(Object.assign({}, (this as any)[selectedFormName]));
          } catch (err) {
            errMessage = (err as Error)?.message || errMessage;
            reject(new Error(errMessage));
          }
        } else {
          validation &&
            this.$message.error({
              duration: 5000,
              message: errMessage
            });
          reject(new Error(errMessage));
          // reject(new Error(rest?.length ? JSON.stringify(rest) : errMessage))
        }
      });
    });
  }
}
Vue.mixin(GlobalMixin);
