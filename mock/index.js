"use strict";

// 环境变量操作
process.env.DEBUG = "mock:*";

const path = require("path");
const debug = require("debug");
const logger = require("morgan");
const express = require("express");
const mock = require("express-mockjs");
const PORT = process.env.PORT || 8001;
const NODE_ENV = process.env.NODE_ENV;

const log = debug("mock:server");
const info = debug("mock:info");

const app = express();

// 请求日志
app.use(logger("dev"));

// 允许跨域
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

// mock json 数据
// 文档: https://github.com/52cik/express-mockjs
app.use("/api", mock(path.join(__dirname, "./data")));

// 404
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// 错误统一输出
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
    url: req.url
  });
});

// 基本信息
console.log("  =====================================================");
info("About to crank up node.");
info("PORT: " + PORT);
info("NODE_ENV: " + NODE_ENV);
info("env: " + app.get("env"));
info("dirname: " + __dirname);
console.log("  =====================================================");

// 绑定端口
app.listen(PORT, function() {
  log("Mock server listening on port " + PORT);
});
