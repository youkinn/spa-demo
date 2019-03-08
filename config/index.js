/**
 * 根据不同的环境替换配置文件
 * dev 开发环境； dev 开发环境； test 测试环境； pre 预发环境； prod 生产环境
 */

const NODE_ENV = {
  dev: {
    // 网站地址
    location: "http://127.0.0.1:3000",
    // CDN 服务器
    CDN_ADDRESS: "",
    // Api服务器
    SERVER_ADDRESS: "http://127.0.0.1:8001"
  },
  test: {},
  pre: {},
  prod: {}
};

module.exports = NODE_ENV[process.env.NODE_CONFIG || "dev"];
