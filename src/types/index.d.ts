// 替代直接使用 Function 类型
type YkFunction<R = unknown, P = any[]> = (...args: P) => R;
// 主要用在编辑页面中，兼容number类型的值初始化时为 ''
type FormInit<T> = T extends null
  ? null
  : Partial<{
      [k in keyof T]: T[k] extends number | undefined ? '' | T[k] : T[k];
    }>;

// YkTable
interface ColumnItemProp<T extends Record<string, any>> {
  prop: keyof T;
  key?: string;
  type?: 'selection' | 'index' | 'expand';
  label: string;
  slot?: string;
  align?: 'center' | 'left' | 'right';
  fixed?: 'left' | 'right' | boolean;
  /** 最小宽度，默认根据 label 计算 */
  minWidth?: number;
  /** 宽度，默认根据 label 计算 */
  width?: number;
  className?: string;
  formatter?: (row: T, column: ColumnItem<T>, cellValue: any, index: number) => any;
  /** 是否开启 tooltip 展示，开启后会将 width 自动设置为 minWidth */
  showOverflowTooltip?: boolean;
}
type ColumnItemSlot<T extends Record<string, any>, S extends string = string> = Omit<
  ColumnItemProp<T>,
  'prop'
> & { prop?: string; slot: S };
type ColumnItemAction<T extends Record<string, any>> = Omit<
  ColumnItemSlot<T, 'action'>,
  'label'
> & {
  label?: string;
  listeners?: {
    remove?: YkFunction<Promise<void>>;
    edit?: YkFunction<void>;
    detail?: YkFunction;
  };
};
type ColumnItem<T extends Record<string, any>> =
  | ColumnItemProp<T>
  | ColumnItemSlot<T>
  | ColumnItemAction<T>;

// options.ts
interface OptItem {
  value: number;
  label: string;
}
