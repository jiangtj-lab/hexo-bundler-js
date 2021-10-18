/* global hexo */

'use strict';

const { minify } = require('terser');
const { resolve } = require('path');

const crypto = require('crypto');
const hash = crypto.createHash('md5');

const { generator, injector, helper } = hexo.extend;
const url_for = helper.get('url_for').bind(hexo);

generator.register('bundler-js', () => {

  const cf = Object.assign({code: undefined, options: {}}, hexo.config.bundler_js);

  if (!cf.code) {
    return;
  }

  Object.keys(cf.code).forEach(key => {
    const str = cf.code[key];
    if (str.endsWith('.js')) {
      cf.code[key] = hexo.render.renderSync({path: resolve(hexo.base_dir, str)});
    }
  });

  return minify(cf.code, cf.options)
    .then(result => {
      hash.update(result.code);
      const md5 = hash.digest('hex');

      const link = `/js/bundler.${md5}.js`;
      injector.register('body_end', `<script src="${url_for(link)}" defer></script>\n`);

      return {
        path: `js/bundler.${md5}.js`,
        data: result.code
      };
    });

});
