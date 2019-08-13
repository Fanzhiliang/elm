// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    historyList: [
      '快餐','汉堡','回味鸡','私家','记','Q堡堡','粥','肥仔','工夫好','正'
    ],
    hotList: [
      '一点点@一点点','9.9元切水果','华莱士','麻辣烫','CoCo都可','益禾堂','酸菜鱼','客汇焗饭','穗禾深夜豆浆','一品湘木桶饭','4219主食沙拉'
    ],
    tagList:[
      '蜂鸟专送','快餐便当','其他快餐','小吃宵夜','汉堡薯条','盖浇饭','特色菜系','炸鸡炸串','烧腊饭','粥店','麻辣烫','其他小吃','肠粉'
    ],
    status: 'beforeSearch',//beforeSearch搜索前、searching搜索中、serached完成搜索
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
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  inputHandler: function(e){//输入关键词
    var keyword = e.detail.value;
    var that = this;
    clearTimeout(that.timer);
    that.setData({ keyword });//这里先修改keyword，因为用户可能输入完后马上点击完成进行搜索
    that.timer = setTimeout(function(){
      if (!keyword) {//如果keyword为空，把状态设为搜索前
        that.setData({status: 'beforeSearch'});
      } else {
        that.setData({status: 'searching'});
      }
    },200);
  },

  confirmHandler: function(){//搜索
    this.setData({ status: 'serached' });
  },

  selectKeyword: function(e){//点击关键词
    this.setData({
      keyword: e.currentTarget.dataset.keyword
    })
    this.confirmHandler();
  },

  selected: function (e) {
    let resultArray = e.detail;
    let arr = resultArray.map(function (item) {
      return item.text;
    })
    wx.showToast({
      title: arr.join(','), icon: 'none'
    })
  },

  toggleShowActivity: function (e) {
    let index = parseInt(e.currentTarget.dataset.index);
    let teampArray = [].concat(this.data.goodsList);
    teampArray[index].showActivity = !teampArray[index].showActivity;
    this.setData({
      goodsList: teampArray
    })
  },

  scrolltolower: function(e){//滚动到底部
    setTimeout(()=>{
      this.setData({
        hasMore: false
      })
    },1500)
  },

  clearHistory: function(){
    this.setData({
      historyList: []
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