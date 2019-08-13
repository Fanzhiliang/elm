const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session';
const appId = 'wxaec7468b8c7b3342';
const appSecret = '6b8a5cc7c4f1409f6c81bfc58d3d97b2';

module.exports = {
  //app.js初始化
  init: function(app){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //获取用户信息
  getUserInfo: function (app, callback) {
    if (app && app.globalData && app.globalData.userInfo) {
      callback(app.globalData);
    } else if (wx.canIUse('button.open-type.getUserInfo')) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = callback;
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: callback
      })
    }
  },
  //登录获取openId和session_key等
  login: function (app){
    return new Promise(function(reslove,reject){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: loginUrl+'?appid=' + appId + '&secret=' + appSecret + '&js_code=' + res.code + '&grant_type=authorization_code',
            success: function (res) {
              if (res.statusCode == 200){
                if (app){
                  app.globalData.openid = res.data.openid;
                  app.globalData.session_key = res.data.session_key;
                }
                reslove(res.data);
              }else{
                reject();
              }
            },
            fail: reject
          })
        },
        fail: reject
      })
    })
  }
}