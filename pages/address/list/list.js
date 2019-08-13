// pages/address/list/list.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiveList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储的收货地址
    this.resetReceiveList();
  },

  resetReceiveList: function () {//重新获得收货地址
    let receiveList = wx.getStorageSync('receiveList');
    this.setData({
      receiveList: receiveList && receiveList.length > 0 ? receiveList : []
    })
  },

  goEdit: function(e){//前往编辑页面
    let index = e.currentTarget.dataset.index;
    let receive = this.data.receiveList[index];
    receive.index = index;//添加下标字段是为了方便在编辑实现删除
    app.globalData.selectReceive = receive;
    wx.navigateTo({
      url: '/pages/address/form/form'
    })
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