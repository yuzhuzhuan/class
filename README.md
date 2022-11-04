# 项目简介
> 这是一个简单的vue2 和 typescript 的后台管理模板。主页实现了菜单的跳转，面包屑等，和一些基本的功能。
> 账号: `admin`
> 密码： 123456

# 项目技术栈
vue2 + typescript + elementui + router + axios + scss 

# 环境
nodejs(v14.16.1)+yarn+eslint

 ## 包依赖简介
### 生成环境包

```javascript
"dependencies": {
    "@babel/polyfill": "^7.12.1",  // 兼容ie10 的关键包，需要在main.ts的第一行导入哦
    "@iconify/iconify": "^3.0.0", // icon图标
    "@tinymce/tinymce-vue": "3.0", // tinymce富文本编辑器
    "@types/mockjs": "^1.0.7", // mockjs的TypeScript定义
    "axios": "^0.21.1", // 获取网络请求
    "core-js": "^3.6.5",  // 核心js库
    "element-ui": "^2.15.1", // elementui 库
    "js-cookie": "^2.2.1", // 使用cookie 进行存储数据
    "mockjs": "^1.1.0", // mock数据
    "moment": "^2.29.4",// 日期处理类库
    "normalize.css": "^8.0.1", // css 对项目的基本样式初始化
    "path-to-regexp": "^6.2.0",  // 将路径字符串（如/ user /：name）转换为正则表达式，匹配路由
    "style-resources-loader": "^1.4.1", // 对样式资源的加载器
    "vue": "^2.6.11", // 不介绍
    "vue-class-component": "^7.2.3", // vue 类组件库 必备
    "vue-property-decorator": "^9.1.2", // vue 类的装饰器
    "vue-router": "^3.2.0", // router
    "vue-svgicon": "^3.2.9", // 使用的图标
    "vuex": "^3.4.0", // 存储数据的vuex
    "vuex-module-decorators": "^1.0.1" // vuex 的类型检查
  },
```
### 开发环境包
不解释，基本上都是一些自带的包，然后安装一些预编译的包。eslint , ts, @types等

# 开发注意
## 图标
图标直接去iconify官网复制到对应的图标名称，使用<SpIcon icon="图标名称">组件，修改icon的图标名称

### 文件资源目录 📚

```text
├─ .vscode                # vscode推荐配置
├─ mock                   # mock文件
├─ api                    # 配合mock使用的api
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ layout              # 框架布局
│  ├─ pages               # 项目所有页面
│  ├─ router              # 路由管理
│  ├─ store               # vuex store
│  ├─ styles              # 全局样式
│  ├─ types               # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ App.vue             # 入口页面
│  └─ main.ts             # 入口文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ index.html             # 入口 html
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vue.config.ts          # vue 配置
```

## router
 所有的路由都如果需要在菜单的右侧中显示，必须要要配置在layout组件的`children`中.
 如：（详细请查看源码）
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310125655718.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
## 颜色变量
默认我全局导入了两个变量文件，一个是`variable.scss`, 另一个是 `mixin.scss`, 需要啥颜色直接改里面的`$mianColor` 和 `subColor`， 包括可以定义elementui的主题颜色
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310125831826.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
## 表单验证
我也封装了一个表单验证器，可以直接在`el-form-item ` 中的rule 导入对应的规则，即可，如：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310130045604.png)
# 菜单权限控制
因为没有后台支持，权限控制直接在`matchRouteMenu ` 路由守卫进行匹配和存入数据 即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310130138102.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
# 最后：
基础的架子已经搭建好，只适合一些需要兼容ie项目的vue应用。毕竟vue3 不兼容ie嘛！
