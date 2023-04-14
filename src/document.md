# YkTable组件

#### Props

| 属性名      | 说明       | 类型                             | required |
| :---------- | ---------- | -------------------------------- | -------- |
| list        | 表格数据   | Array \|YkFunction<Promise<any>> | true     |
| columns     | 表头数据   | Array                            | true     |
| totalNum    | 数据总数量 | number \| string                 | false    |
| pageOptions | 页码数据   | Object                           | false    |
| autoRequest | 自动请求   | boolean                          | false    |
| loading     | 加载中     | boolean                          | false    |

> pageOptions可不传，默认数据可使用YkTable组件的pageInfoMixin
>
> 其他`el-table` 的属性都支持，详情属性见[`el-table`](https://element.eleme.cn/#/zh-CN/component/table)文档。

#### columns(**必填**)

| 属性名    | 类型                           | 说明                                          | required |
| --------- | ------------------------------ | --------------------------------------------- | -------- |
| label     | string                         | 显示的标题                                    | true     |
| prop      | string                         | 对应列内容的字段名                            | true     |
| type      | 'selection'\|'index'\|‘expand’ | 对应列的类型                                  | false    |
| align     | 'center'\|'left'\|’right‘      | 对齐方式                                      | false    |
| fixed     | 'left'\| ’right‘\|boolean      | 列是否固定在左侧或者右侧，true 表示固定在左侧 | false    |
| minWidth  | number                         | 对应列的最小宽度                              | false    |
| width     | number                         | 对应列的宽度                                  | false    |
| slot      | string \|‘                     | 自定义列内容                                  | false    |
| tooltip   | boolean                        | 当内容过长被隐藏时显示 tooltip                | false    |
| className | string                         | 列的className                                 | false    |

> 如需添加`el-table` 其他属性，需要在YKTable组件ColumnItem类型中对应添加属性名及类型。

#### 代码示例

```javas
<YKtable
   :columns="tableColumns"
   :list="list"
   :pageOptions="pageInfo"
></YKtable>
```

# YkEditor组件

目前是编辑器版本是6.2.0

如果需要加上百度地图插件

1.降级到5.6.0版本，

2.下载bdmap插件放入public\static\tinymce\plugins文件夹中

3.在项目中src\components\YKeditor\index.vue文件中给plugins和toolbar属性都添加bdmap

#### 代码示例

```javas
 <YKeditor v-model="content"></YKeditor>
```

# 表格拖拽排序

1. 单表格使用拖拽排序

```javascript
 // 创建sortable实例
   initSortable() {
    const ele = document.querySelector('.el-table__body > tbody') as HTMLElement;
    // 创建拖拽实例
    Sortable.create(ele, {
      animation: 150, // 动画
      disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
      handle: '.move', // 指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
      filter: '.disabled', // 指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
      dragClass: 'dragClass', // 设置拖拽样式类名
      ghostClass: 'ghostClass', // 设置拖拽停靠样式类名
      chosenClass: 'chosenClass', // 设置选中样式类名
      // 开始拖动事件
      onStart: () => {
        // console.log('开始拖动');
      },
      onEnd: async (event: any) => {
        const targetRow = this.list.splice(event.oldIndex, 1)[0]; // 拖拽后的行
        this.list.splice(event.newIndex, 0, targetRow); // 得到拖拽后的数组
        const sortData = this.list.map((item, index) => {
          return {
            id: item.id,
            sort: index + 1,
          };
        });
        const { data } = await service.updateSort(sortData);

        if (data === '操作成功') {
          this.getList();
        }
      },
    });
  }

  mounted() {
    this.initSortable();
  }
```

2. 动态循环生成的表格使用拖拽排序

```javascript
给el-table标签添加 :class="['case' + `${index}`]"

// 在循环生成的表格函数中 创建sortable实例
this.initSortable('.case' + i + ' .el-table__body-wrapper tbody', i);

// 创建sortable实例
initSortable(docSelect: any, index: any) {
    const tbody = document.querySelector(docSelect);
    // 创建拖拽实例
     ...同上,
    
       onEnd: (event: any) => {
        // 修改排序后的数据
        const targetRow = this.list[index].splice(event.oldIndex, 1)[0]; // 拖拽后的行
        this.list[index].splice(event.newIndex, 0, targetRow); // 得到拖拽后的数组
        const sortData = this.list[indecaseAddx].map((item, index) => {
          return {
            id: item.id,
            sort: index + 1,
          };
        });
        const { data } = await service.updateSort(sortData);

        if (data === '操作成功') {
          this.getList();
        }
       
      }
  }
```

# YkDialog组件

### props

| 属性名         | 说明         | 类型                       | required |
| :------------- | ------------ | -------------------------- | -------- |
| title          | 标题         | Dialog 的标题              | true     |
| type           | 类型         | 'alert'\|'confirm'         |          |
| size           | 尺寸         | 'h-full'\|'w-full'\|'full' | false    |
| onOk           | 操作确认方法 | YkFunction                 | true     |
| okText         | 操作确认文本 | string                     |          |
| actionPosition | 按钮操作位置 | 'top'\|'bottom'\|false     |          |

> 其他`el-dialog` 的属性都支持，详情属性见[`el-dialog`](https://element.eleme.cn/#/zh-CN/component/dialog)文档。

# yk-form-item组件

### props

| 属性名   | 说明                                         | 类型                  | required |
| :------- | -------------------------------------------- | --------------------- | -------- |
| rules    | 表单验证规则                                 | RuleItem \|RuleItem[] | false    |
| ruleType | 规则类型                                     | RuleItem['type']      | false    |
| label    | 标签文本                                     | string                |          |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean               | false    |

> 其他`el-form` 的属性都支持，详情属性见[`el-form`](https://element.eleme.cn/#/zh-CN/component/form)文档。

# yk-form-input组件

### props

| 属性名      | 说明               | 类型    | required |
| :---------- | ------------------ | ------- | -------- |
| placeholder | 输入框占位文本     | string  | false    |
| type        | 类型               | string  | false    |
| className   | className          | string  | false    |
| number      | InputNumber 计数器 | boolean | false    |

> 其他`el-input` 的属性方法都支持，详情属性见[`el-input`](https://element.eleme.cn/#/zh-CN/component/input)文档。

# yk-form-select组件

### props

| 属性名        | 说明               | 类型                                           |
| :------------ | ------------------ | ---------------------------------------------- |
| placeholder   | 输入框占位文本     | string                                         |
| options       | 选项               | Array<{ value: string\|number;label: string }> |
| all           | className          | string                                         |
| selectOnlyOne | InputNumber 计数器 | boolean                                        |

> 其他`el-select` 的属性方法都支持，详情属性见[`el-select`](https://element.eleme.cn/#/zh-CN/component/select)文档。

