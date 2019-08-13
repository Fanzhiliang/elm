// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      {
        name: '华莱士炸鸡汉堡(犀牛角店)',
        logo: '/static/img/shop-logo-1.jpg',
        showActivity: false,
        isNew: false,
        activityList: [
          { title: '满26减13，满50减25', icon: '/static/img/screen-3.png' },
          { title: '特价商品1.99元起', icon: '/static/img/screen-8.png' },
          { title: '新用户立减17元', icon: '/static/img/screen-12.png' }
        ]
      },
      {
        name: '豫江南(元岗店)',
        logo: '/static/img/shop-logo-2.jpg',
        showActivity: false,
        isNew: true,
        activityList: [
          { title: '满26减13，满50减25', icon: '/static/img/screen-3.png' },
          { title: '特价商品1.99元起', icon: '/static/img/screen-8.png' },
          { title: '新用户立减17元', icon: '/static/img/screen-12.png' }
        ]
      },
      {
        name: '华莱士炸鸡汉堡(犀牛角店)',
        logo: '/static/img/shop-logo-1.jpg',
        showActivity: false,
        isNew: false,
        activityList: [
          { title: '满26减13，满50减25', icon: '/static/img/screen-3.png' },
          { title: '特价商品1.99元起', icon: '/static/img/screen-8.png' },
          { title: '新用户立减17元', icon: '/static/img/screen-12.png' }
        ]
      },
      {
        name: '豫江南(元岗店)',
        logo: '/static/img/shop-logo-2.jpg',
        showActivity: false,
        isNew: true,
        activityList: [
          { title: '满26减13，满50减25', icon: '/static/img/screen-3.png' },
          { title: '特价商品1.99元起', icon: '/static/img/screen-8.png' },
          { title: '新用户立减17元', icon: '/static/img/screen-12.png' }
        ]
      }
    ],
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.text,
    })
  },
  onReachBottom: function () {//页面上拉触底事件的处理函数
    setTimeout(() => {
      this.setData({
        hasMore: false
      })
    }, 1500)
  },
  selected: function(e){
    let resultArray = e.detail;
    let arr = resultArray.map(function (item) {
      return item.text;
    })
    wx.showToast({
      title: arr.join(','), icon: 'none'
    })
  },
  toggleShowActivity: function(e){
    let index = parseInt(e.currentTarget.dataset.index);
    let teampArray = [].concat(this.data.goodsList);
    teampArray[index].showActivity = !teampArray[index].showActivity;
    this.setData({
      goodsList: teampArray
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})