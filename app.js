//app.js
const userInfo = require('./utils/userInfo.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    userInfo.login(this);
    // 获取用户信息
    userInfo.init(this);
  },
  globalData: {
    userInfo: null,
    location: {},
    selectReceive: {}
  }
})