// pages/user/user.js
//获取应用实例
const app = getApp();
const userInfo = require('../../utils/userInfo.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo.getUserInfo(app, this.setUserInfo);
  },
  //获取用户信息
  getUserInfo: function(e){
    console.log(e)
    this.setUserInfo(e.detail);
  },
  //设置用户信息
  setUserInfo: function(res){
    this.setData({
      userInfo: res.userInfo
    })
    app.globalData.userInfo = res.userInfo
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})