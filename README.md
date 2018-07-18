# hexo-cache
**用于hexo博客添加service worker缓存支持**
1. 安装
```
npm install hexo-cache --save
```
2. 给HTML模板添加一段JavaScript，以next主题为例
layout文件夹 -> _layout.swig文件
在header上添加如下代码
```
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (registration) {

                // 注册成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function (err) {

                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
  }
</script>
```
3. 增加_config.yml配置项

hexoCache:
  ignoreRequestKeywords:
    - google
    - baidu
  version: 2018-07-18T13:00


4. 执行 `hexo g` 即可添加service worker缓存支持
