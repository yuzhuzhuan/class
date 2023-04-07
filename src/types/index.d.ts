// 替代直接使用 Function 类型
type YkFunction<R = unknown> = (...args: any[]) => R;
// 主要用在编辑页面中，兼容number类型的值初始化时为 ''
type FormInit<T> = Partial<{
  [k in keyof T]: T[k] extends number | undefined ? '' | T[k] : T[k];
}>;
