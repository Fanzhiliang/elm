//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrls: [
      '/static/img/banner-1.jpg', '/static/img/banner-2.jpg','/static/img/banner-3.jpg'
    ],
    indicatorDots: true,
    interval: 5000,
    duration: 500,
    indicatorColor: '#DEDEDE',
    indicatorActiveColor: '#AAAAAA',
    tabList: [
      [
        { text: '美食', src: '/static/img/tab-1.png' },
        { text: '商超便利', src: '/static/img/tab-2.png' },
        { text: '水果', src: '/static/img/tab-3.png' },
        { text: '医药健康', src: '/static/img/tab-4.png' },
        { text: '异国料理', src: '/static/img/tab-5.png' },
        { text: '地方小吃', src: '/static/img/tab-6.png' },
        { text: '麻辣烫', src: '/static/img/tab-7.png' },
        { text: '速食便餐', src: '/static/img/tab-8.png' },
      ],
      [
        { text: '大牌惠吃', src: '/static/img/tab-9.png' },
        { text: '汉堡披萨', src: '/static/img/tab-10.png' },
        { text: '包子粥店', src: '/static/img/tab-11.png' },
        { text: '米粉面馆', src: '/static/img/tab-12.png' },
        { text: '鸭脖卤味', src: '/static/img/tab-13.png' },
      ]
    ],
    tempGoodsList: [
      {
        name: '华莱士炸鸡汉堡(犀牛角店)',
        logo: '/static/img/shop-logo-1.jpg',
        showActivity: false,
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
        activityList: [
          { title: '满26减13，满50减25', icon: '/static/img/screen-3.png' },
          { title: '特价商品1.99元起', icon: '/static/img/screen-8.png' },
          { title: '新用户立减17元', icon: '/static/img/screen-12.png' }
        ]
      }
    ],
    goodsList: [],
    hasMore: true,
    currentAddress: '请选择定位',
  },
  onLoad: function () {
    this.refreshLocation();
    this.getList();
  },
  onReady: function(){
    
  },
  getList: function(){//模拟获取数据
    this.setData({goodsList: []});
    let tempList = [].concat(this.data.tempGoodsList);
    setTimeout(()=>{
      this.setData({goodsList: tempList});
    },1500)
  },
  refreshLocation: function(){//刷新定位
    return new Promise((reslove,reject)=>{
      wx.getStorage({
        key: 'location',
        success: ({ errMsg, data }) => {
          if (errMsg == 'getStorage:ok') {
            this.setData({ currentAddress: data.address });
            reslove(data);
          }else{
            reject(errMsg);
          }
        }
      })
    })
  },
  refreshList: function(){//模拟刷新列表
    let tempArray = [].concat(this.data.goodsList);
    this.setData({ hasMore: true, goodsList: [] });
    setTimeout(()=>{
      this.setData({ goodsList: tempArray });
    },1500)
  },
  toggleShowActivity: function(e){
    let index = parseInt(e.currentTarget.dataset.index);
    let teampArray = [].concat(this.data.goodsList);
    teampArray[index].showActivity = !teampArray[index].showActivity;
    this.setData({
      goodsList: teampArray
    })
  },
  selected: function(e){//组件选择事件
    let resultArray = e.detail;
    let arr = resultArray.map(function(item){
      return item.text;
    })
    wx.showToast({
      title: arr.join(','),icon: 'none'
    })
  },
  onReachBottom: function(){//拉到底部事件
    setTimeout(()=>{
      this.setData({
        hasMore: false
      })
    },1500)
  },
  onPullDownRefresh: function(){//下拉刷新事件
    this.getList();
    setTimeout(() => {
      let sortDialog = this.selectComponent('#sort-dialog');
      sortDialog.clearAll();
      this.setData({hasMore: true});
      wx.stopPullDownRefresh();
    }, 1500)
  }
})
