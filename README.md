
### 运行

  cd starter

  npm i

  npm start

> 浏览器访问 http://localhost:8080

* publicPath 路径设置错误，导致 font 文件无法在浏览器端访问。因为当使用 loader 对 font 进行加载后，生成到新的指定目录中，将自动替换 css 中的 @font-family 声明的 font 文件路径。
* package.json 中 scripts 加入新 key 时，忘记在前一个 value 后加入 『，』，导致 webpack 无法正常编译，提示各种 ERROR in Entry module not found: Error: Cannot resolve 'file' or 'directory' /Users/yourname/starter/src/pages/index/index.js in /Users/yourname/starter
* webpack-dev-server 命令行中的 content-base 设置错误导致 html 页面无法访问，在当前范例中不需要设置此选项。

```
webpack --display-modules --profile --colors
```
新增加了三个参数，这三个参数的含义分别是：

* --colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
* --profile输出性能数据，可以看到每一步的耗时
* --display-modules默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块 这次命令行的结果已经很有参考价值，可以帮助我们定位耗时比较长的步骤


### [hash] [chunkhash:8] 的区别
[hash] 由当次编译生成的 hash 值，每次编译 hash 值都不同。
[chunkhash:8] 编译时根据 chunk 生成 hash，某个编译后的 chunk 如果没有修改过，则 chunkhash 与上次保持一致

### devtool

* eval  generated code
# cheap-source-map  transformed code (lines only)
* source-map  original source

https://github.com/webpack/docs/wiki/configuration#devtool

