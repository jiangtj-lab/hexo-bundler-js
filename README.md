# hexo-bundler-js

Only for test

```
yarn add @jiangtj/hexo-bundler-js
```

## example

1. add config
  ```yml
  bundler_js:
    code:
      'test.js': test.js
      # file name: file path (base hexo.base_dir)
  ```

2. create js file `test.js` in base_dir
  ```js
  console.log("Hi, hello world!")
  ```

output:
```
# hexo g
INFO  Generated: js/bundler.83d361b48c5e39986c9fbb461c6a9970.js

# html file
<!-- hexo injector body_end start -->
<script src="/js/bundler.83d361b48c5e39986c9fbb461c6a9970.js" defer></script>
<!-- hexo injector body_end end -->
```
