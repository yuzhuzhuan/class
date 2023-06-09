import { isPhoneNumber, isEmailNumber } from './validate';

type cbFunc = (msg?: string | Error) => void;
export const FormValidator = {
  /**
   * 验证手机号码的长度是否符合规范
   * @returns {{validator: validator, trigger: string}}
   */
  isPhone: (isRequired: boolean, msg?: string, opt?: string) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback(new Error(`${msg}不能为空`));
        } else if (value.length > 11) {
          return callback(new Error('长度超过11位'));
        } else if (isPhoneNumber(value)) {
          return callback();
        } else if (!isPhoneNumber(value)) {
          return callback(new Error(`${msg}格式不正确`));
        } else if (value.length !== 0) {
          return callback(new Error('输入中……'));
        }
      },
      trigger: opt || 'change',
      required: isRequired || true,
    };
  },
  /**
   * 验证手机号码的长度是否符合规范
   * @returns {{validator: validator, trigger: string}}
   */
  isEmail: (isRequired: boolean, msg?: string, opt?: string) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback(new Error(`${msg}不能为空`));
        } else if (value.length < 0) {
          return callback(new Error('输入中……'));
        } else if (isEmailNumber(value)) {
          return callback();
        } else if (!isEmailNumber(value)) {
          return callback(new Error(`${msg}格式不正确`));
        }
      },
      trigger: opt || 'change',
      required: isRequired || true,
    };
  },
  /**
   * 是否为身份证
   * @returns {{validator: validator, trigger: string, required: boolean}}
   */
  isIDCard: (isRequired: boolean, opt?: string) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback(new Error('该选项不能为空'));
        } else if (value.length > 18) {
          return callback(new Error('长度超过18位'));
        } else if (value.length < 18) {
          return callback(new Error('输入中……'));
        } else {
          return callback();
        }
      },
      trigger: opt || 'blur',
      required: isRequired || true,
    };
  },
  /**
   * 验证输入数字的长度是否符合规范
   * @param begin {Number} 开始的长度
   * @param end {Number} 最大长度
   * @returns {{validator: validator, trigger: string}}
   */
  checkNumberLength: (begin: number, end: number, isRequired: boolean, opt?: string) => {
    return {
      validator: (rule: any, value: number, callback: cbFunc) => {
        let valueStr = value.toString();
        if (!valueStr || valueStr.length === 0) {
          return false;
        } else {
          valueStr = valueStr.trim();
          if (/^\d+$/.test(valueStr)) {
            const len = valueStr.length;
            if (len < begin) {
              return callback(new Error('等待输入中...'));
            } else if (end !== null && len > end) {
              return callback(new Error('输入超出长度'));
            }
            return callback();
          }
        }
      },
      required: isRequired || true,
      trigger: opt || 'change',
    };
  },
  /**
   * 验证字符的长度是否符合规范
   * @param begin{Number} 字符开始的长度
   * @param end {Number} 字符的最大长度
   * @returns {{validator: validator}}
   */
  checkStringLength: (
    begin: number,
    end: number,
    msg: string,
    isRequired: boolean,
    opt?: string,
  ) => {
    return {
      validator: (rule: any, value: string, callback: cbFunc) => {
        if (!value || value.length === 0) {
          return callback(new Error(`${msg}不能为空`));
        } else if (/^.+$/.test(value)) {
          // value = value.trim();
          const len = value.length;
          if (len < begin) {
            return callback(new Error(`${msg}少于1位,等待输入中……`));
          } else if (end !== null && len > end) {
            return callback(new Error('输入超出长度'));
          }
          return callback();
        }
      },
      required: isRequired || true,
      trigger: opt || 'change',
    };
  },
  /**
   * 验证不为空的选项
   * @returns {{validator: validator}}
   */
  checkNotNull: (isRequired: boolean, opt?: string) => {
    return {
      validator: (rule: any, value: any, callback: cbFunc) => {
        if (Number(value) && value !== 0) {
          return callback();
        }

        if (!value || value.length === 0) {
          return callback(new Error('该选项不能为空'));
        }
        return callback();
      },
      required: isRequired || true,
      trigger: opt || 'change',
    };
  },
};
