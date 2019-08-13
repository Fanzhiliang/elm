// pages/address/form/form.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: true,
    name: '',
    mobile: '',
    address: '',
    remark: '',
    gender: null,
    place: null,
    location: {},
    genderList: ['先生','女士'],
    placeList: ['家','学校','公司']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isAdd){//添加
      this.setData({
        isEdit: false
      })
    } else if (app.globalData.selectReceive){//编辑
      let { gender, location, mobile, name, place, remark, address } = app.globalData.selectReceive;
      this.setData({ gender, location, mobile, name, place, remark, address });
    }
  },

  inputedit: function(e){
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.data[dataset.item] = value;
  },

  selectGender: function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({gender: index});
  },

  selectPlace: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({place: index});
  },

  setLocation: function (location){
    this.setData({
      address: location.title,
      location
    })
  },

  backPrevPage: function(){//返回上一页并执行一些方法
    //获取上一页
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (prevPage.resetReceiveList) {//选择收货地址页面
      prevPage.resetReceiveList();
    }
    wx.navigateBack();
  },

  sure: function(){//确定
    let receiveList = wx.getStorageSync('receiveList');
    receiveList = receiveList && receiveList.length > 0 ? receiveList : [];
    if (this.data.isEdit && app.globalData.selectReceive && receiveList.length>0) {//确定编辑
      let index = app.globalData.selectReceive.index;
      receiveList.splice(index, 1, this.data);
    } else {//确定添加
      receiveList.push(this.data); 
    }
    wx.setStorageSync('receiveList', receiveList);
    this.backPrevPage();
  },

  deleteHandler: function(){//删除
    if (app.globalData.selectReceive){
      let index = app.globalData.selectReceive.index;
      let receiveList = wx.getStorageSync('receiveList');
      receiveList = receiveList && receiveList.length > 0 ? receiveList : [];
      receiveList.splice(index, 1);
      wx.setStorageSync('receiveList', receiveList);
      this.backPrevPage();
    }
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