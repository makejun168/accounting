/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1682268340509_1603';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };

  config.view = {
    mapping: {'.html': 'ejs'}  //左边写成.html后缀，会自动渲染.html文件
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'juejue-cost', // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  // secret 加密字符串，将在后续用于结合用户信息生成一串 token。secret 是放在服务端代码中，普通用户是无法通过浏览器发现的，所以千万不能将其泄漏，否则有可能会被不怀好意的人加以利用。

  config.jwt = {
    secret: 'PoloMa',
  };

  // egg 提供两种文件接收模式，1 是 file 直接读取，2 是 stream 流的方式。我们采用比较熟悉的 file 形式。
  // 所以需要前往 config/config.default.js 配置好接收形式

  config.multipart = {
    mode: 'file'
  };

  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  return {
    ...config,
    ...userConfig,
  };
};
