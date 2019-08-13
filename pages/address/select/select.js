var mapSdk;
var {getMapSdk,getLocation} = require('../../../utils/location.js');
const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '北京市',
    addressRes: {
      latitude: 39.5427,
      longitude: 116.2317
    },
    currAddress: '定位中...',//当前位置
    nearby: [],//附近地点
    isShowFooter: true,
    keyword: '',//搜索关键词
    searchList: [],//搜索结果
    isHideReceive: false,//是否显示收货地址
    receiveList: [],//收货地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isHideReceive){
      this.setData({isHideReceive: true});
    }
    //实例化腾讯地图sdk
    mapSdk = getMapSdk();
    //获得缓存的地址信息
    let location = wx.getStorageSync('location');
    console.log(location)
    if (location && location.address) {//有缓存的地址信息
      this.setData({
        addressRes: location,
        city: location.city,
        currAddress: location.address
      })
      this.reverseGeocoder();
    } else {//没有缓存的地址信息就进行重新定位
      this.resetAddress();
    }
    //获取本地存储的收货地址
    this.resetReceiveList();
  },

  reverseGeocoder: function (){//获取位置信息成功过后定位
    let { latitude, longitude } = this.data.addressRes;
    wx.showLoading({title: '定位中',});
    mapSdk.reverseGeocoder({
      location: { latitude, longitude },
      get_poi: 1,
      success: (res)=>{
        console.log(res)
        this.setData({
          city: res.result.address_component.city,
          currAddress: res.result.address,
          nearby: res.result.pois.splice(0,3)
        }, wx.hideLoading)
      },
      fail: function(res){
        console.log(res)
        wx.hideLoading();
        wx.showModal({
          title: '错误',content: '腾讯地图sdk定位失败!',showCancel: false,
          success: wx.navigateBack
        })
      }
    })
  },

  resetAddress: function () {//重新定位
    getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({addressRes: res});
        this.reverseGeocoder();
      },
      fail: wx.navigateBack//返回上一页
    })
  },

  resetReceiveList: function () {//重新获得收货地址
    let receiveList = wx.getStorageSync('receiveList');
    this.setData({
      receiveList: receiveList && receiveList.length > 0 ? receiveList : []
    })
  },

  search: function(){//搜索
    mapSdk.search({
      keyword: this.data.keyword,
      region: this.data.city,
      // filter: 'category=学校,楼宇,公交站,地图站,地标',
      success: (res)=>{
        this.setData({
          searchList: res.data
        })
      },
      fail: (res)=>{
        console.log(res);
        this.setData({ searchList: [], keyword: '' });
      }
    })
  },

  inputHandler: function(e){//输入关键词
    clearTimeout(this.timer);
    var keyword = e.detail.value;
    this.setData({keyword});
    this.timer = setTimeout(this.search, 200);
  },

  selectNearbyAddress: function(e){//选择附近地址作为定位
    let index = e.currentTarget.dataset.index;
    let selectObj = this.data.nearby[index];
    this.setPrevPageData(selectObj);
  },

  selectSearchAddress: function (e) {//选择搜索地址作为定位
    let index = e.currentTarget.dataset.index;
    let selectObj = this.data.searchList[index];
    this.setPrevPageData(selectObj);
  },

  selectReceiveAddress: function (e) {//选择收货地址作为定位
    let index = e.currentTarget.dataset.index;
    let selectObj = this.data.receiveList[index];
    this.setPrevPageData(selectObj.location);
  },

  setPrevPageData: function (selectObj){//设置刷新上一页的数据
    let location = {
      city: this.data.city,
      id: selectObj.id,
      title: selectObj.title,
      address: selectObj.address,
      latitude: selectObj.latitude || selectObj.location.lat,
      longitude: selectObj.longitude || selectObj.location.lng
    }
    wx.setStorageSync('location', location);
    app.globalData.location = location;
    //获取上一页
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (prevPage.refreshLocation && prevPage.refreshList) {//首页
      //刷新定位后再模拟刷新列表
      prevPage.refreshLocation().then(() => {
        prevPage.refreshList();
      })
    }
    if (prevPage.setLocation){//编辑添加收货地址页面
      prevPage.setLocation(location);
    }
    wx.navigateBack();
  },

  onResize: function () {//页面尺寸改变时触发
    this.setData({
      isShowFooter: !this.data.isShowFooter
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