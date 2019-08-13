// 用于获取用户位置信息
// 用户拒绝授权后要再询问用户是否愿意授权，不然需要位置信息的页面会没有用
const getLocation = function({
  type, success, fail
}) {
  wx.getLocation({
    type,
    success,
    fail: function (res) {//失败
      if (res.errMsg == 'getLocation:fail auth deny') {//用户拒绝授权
        wx.showModal({
          title: '提示',
          content: '该页面需要你的位置信息，你是否愿意授权你的位置信息？',
          confirmText: '愿意',
          success: function (e) {
            if (e.confirm) {
              wx.openSetting({//打开授权设置，让用户重新授权
                success: function (res) {
                  if (res.authSetting['scope.userLocation']) {//授权成功
                    getLocation({ type, success, fail });//重新获取位置信息
                  } else {//用户还是没有授权
                    typeof fail == 'function' && fail(res);
                  }
                }
              })
            } else {
              typeof fail == 'function' && fail(res);
            }
          }
        })
      }
    }
  })
}

//获得腾讯地图sdk
const mapKey = 'HDFBZ-XBHR2-35XUI-CSMQA-L2KWT-35FD7';
const getMapSdk = function(){
  var QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
  return new QQMapWX({
    key: mapKey
  })
}

module.exports = {
  getLocation,
  getMapSdk
};