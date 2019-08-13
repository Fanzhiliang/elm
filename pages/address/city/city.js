// pages/address/city/city.js
var cityList = require('../../../data/city.js');
var sortPinyin = require('../../../utils/sort-pinyin.js');
var { getNodeInfo } = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    cityList: [],
    currentCityHeight: 0,
    keyword: '',
    searchList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      city: options.city,
      cityList: sortPinyin(cityList, 'name')
    },()=>{
      let tempArray = [].concat(this.data.cityList);
      tempArray.forEach((item) => {
        getNodeInfo('#' + item.key).then((res) => {
          item.top = res && res[0] && !isNaN(res[0].top) ? res[0].top : false;
        })
      })
      this.setData({cityList: tempArray});
    })

    getNodeInfo('#current-city').then((res)=>{//获得当前城市的高度
      this.setData({
        currentCityHeight: res[0].height
      })
    })
    
  },

  selectPinyin: function(e){
    let index = e.currentTarget.dataset.index;
    let top = this.data.cityList[index].top;
    if (top){
      wx.pageScrollTo({
        scrollTop: top - this.data.currentCityHeight,
        duration: 200
      })
    }else{
      wx.showToast({
        title: '没有' + this.data.cityList[index].key + '开头的城市',icon: 'none'
      })
    }
  },

  search: function(){
    let searchList = [];
    if (this.data.keyword){
      this.data.cityList.forEach((it) => {
        it.list.forEach((item) => {
          if (item.name.includes(this.data.keyword)) {
            searchList.push(item);
          }
        })
      })
    }
    this.setData({searchList});
  },

  inputHandler: function(e){
    clearTimeout(this.timer);
    this.setData({
      keyword: e.detail.value
    })
    this.timer = setTimeout(this.search,200);
  },

  selectCity: function(e){
    let city = e.currentTarget.dataset.city;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length-2];//上一页的实例
    prevPage.setData({
      city
    }, wx.navigateBack)
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