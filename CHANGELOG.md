# 更新日志

## [0.2.0](http://192.168.0.34:18080/web-front-end/vue2-template/-/compare/0.1.0...0.2.0) (2023-02-20)

### 重大变更

- 限制 node 版本: v16.18.0
- 集成 f2elint 功能
- 使用 f2elint 格式化项目代码
- 添加 .vscode 配置文件，推荐配置和插件

拉取代码后需要执行的操作

```bash
npx husky uninstall
rm -rf node_modules && rm package-lock.json
nvm use 16.18.0
npm install --legacy-peer-deps
```
