// pages/shop/shop.js
let {getNodeInfo, watch, computed} = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinal: false,
    isShowFooter: false,
    tabIndex: 0,
    tabList: ['点餐', '评价','商家'],
    scrollList: [
      { image: '/static/img/scroll-goods-1.jpg', title: '特惠套餐', sale: 25, like: '10%', price: 32.5, oldPrice: 32.5, discount: 10, share: 1, info: '汉堡+中可', material: '其他', id: 1, selectNum: 0 },
      { image: '/static/img/scroll-goods-2.jpg', title: '招聘脆皮全鸡餐', sale: 198, like: '100%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '脆皮鸡+中可', material: '鸡一只', id: 2, selectNum: 0 },
      { image: '/static/img/scroll-goods-3.jpg', title: '招聘蜜汁全鸡餐', sale: 217, like: '89%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '蜜汁鸡+中可', material: '鸡一只', id: 3, selectNum: 0 },
      { image: '/static/img/scroll-goods-1.jpg', title: '特惠套餐', sale: 25, like: '10%', price: 32.5, oldPrice: 32.5, discount: 10, share: 1, info: '汉堡+中可', material: '其他', id: 4, selectNum: 0 },
      { image: '/static/img/scroll-goods-2.jpg', title: '招聘脆皮全鸡餐', sale: 198, like: '100%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '脆皮鸡+中可', material: '鸡一只', id: 5, selectNum: 0 },
      { image: '/static/img/scroll-goods-3.jpg', title: '招聘蜜汁全鸡餐', sale: 217, like: '89%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '蜜汁鸡+中可', material: '鸡一只', id: 6, selectNum: 0 },
      { image: '/static/img/scroll-goods-1.jpg', title: '特惠套餐', sale: 25, like: '10%', price: 32.5, oldPrice: 32.5, discount: 10, share: 1, info: '汉堡+中可', material: '其他', id: 7, selectNum: 0 },
      { image: '/static/img/scroll-goods-2.jpg', title: '招聘脆皮全鸡餐', sale: 198, like: '100%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '脆皮鸡+中可', material: '鸡一只', id: 8, selectNum: 0 },
      { image: '/static/img/scroll-goods-3.jpg', title: '招聘蜜汁全鸡餐', sale: 217, like: '89%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '蜜汁鸡+中可', material: '鸡一只', id: 9, selectNum: 0 },
    ],
    tempGoodsList: [
      {
        type: '热销',desc: '大家喜欢吃，才是真的好吃。',
        selectNum: 0,
        list: [
          { image: '/static/img/scroll-goods-1.jpg', title: '特惠套餐', sale: 25, like: '10%', price: 32.5, oldPrice: 32.5, discount: 10, share: 1, info: '汉堡+中可', material: '其他', id: 10, selectNum: 0 },
          { image: '/static/img/scroll-goods-2.jpg', title: '招聘脆皮全鸡餐', sale: 198, like: '100%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '脆皮鸡+中可', material: '鸡一只', id: 11, selectNum: 0 },
          { image: '/static/img/scroll-goods-3.jpg', title: '招聘蜜汁全鸡餐', sale: 217, like: '89%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '蜜汁鸡+中可', material: '鸡一只', id: 12, selectNum: 0 },
        ]
      },
      {
        type: '优惠', desc: '美味又实惠，大家快来抢~',
        selectNum: 0,
        list: [
          { image: '/static/img/scroll-goods-3.jpg', title: '招聘蜜汁全鸡餐', sale: 217, like: '89%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '蜜汁鸡+中可', material: '鸡一只', id: 3, selectNum: 0 },
          { image: '/static/img/scroll-goods-2.jpg', title: '招聘脆皮全鸡餐', sale: 198, like: '100%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '脆皮鸡+中可', material: '鸡一只', id: 2, selectNum: 0 },
          { image: '/static/img/scroll-goods-1.jpg', title: '特惠套餐', sale: 25, like: '10%', price: 32.5, oldPrice: 32.5, discount: 10, share: 1, info: '汉堡+中可', material: '其他', id: 1, selectNum: 0 },
        ]
      },
      {
        type: '华莱士经典套餐',
        selectNum: 0,
        list: [
          { image: '/static/img/scroll-goods-2.jpg', title: '招聘脆皮全鸡餐', sale: 198, like: '100%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '脆皮鸡+中可', material: '鸡一只', id: 13, selectNum: 0 },
          { image: '/static/img/scroll-goods-3.jpg', title: '招聘蜜汁全鸡餐', sale: 217, like: '89%', price: 15.9, oldPrice: 44, discount: 3.6, share: 2, info: '蜜汁鸡+中可', material: '鸡一只', id: 14, selectNum: 0 },
          { image: '/static/img/scroll-goods-1.jpg', title: '特惠套餐', sale: 25, like: '10%', price: 32.5, oldPrice: 32.5, discount: 10, share: 1, info: '汉堡+中可', material: '其他', id: 15, selectNum: 0 },
        ]
      }
    ],
    goodsList: [],
    typeIndex: 0,
    tabFixed: false,
    goodsListTop: 0,
    tabTop: 0,
    rightScrollTop: 0,//右边商品列表滚动距离
    priceTotal: 0,
    oldPriceTotal: 0,
    iconScale: false,
    showSelectList: false,//显示选择列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    computed(this, this.computed);
    watch(this, this.watch);
    //设置标题
    wx.setNavigationBarTitle({
      title: '华莱士炸鸡汉堡(天河谷裕店)',
    })
    setTimeout(()=>{//模拟接口获取数据
      let tempGoodsList = [].concat(this.data.tempGoodsList);
      this.setData({
        isFinal: true,
        isShowFooter: true,
        goodsList: tempGoodsList
      },()=>{
        //获取商品列表距离顶部距离
        getNodeInfo('#goods-list').then((data) => {
          let goodsListTop = data[0].top;
          this.setData({goodsListTop});
          //获取每个分类标题在scroll-view中距离顶部的距离
          this.data.goodsList.forEach((item, index) => {
            getNodeInfo('#type-'+index).then((res) => {
              let typeTop = res[0].top;
              item.scrollTop = typeTop - goodsListTop;
            })
          })
        })
        //获取导航距离顶部距离
        getNodeInfo('#tab').then((data) => {
          this.setData({tabTop: data[0].top});
        })
      });
    },2000)
  },

  computed: {//计算属性
    selectList: function(){//选择的列表
      let result = [];
      this.data.goodsList.forEach((it)=>{
        if (it.selectNum>0){
          it.list.forEach((item)=>{
            if (item.selectNum>0){
              result.push(item);
            }
          })
        }
      })
      let priceTotal = 0;
      let oldPriceTotal = 0;
      result.length > 0 && result.forEach((item) => {
        priceTotal += item.selectNum * item.price;
        oldPriceTotal += item.selectNum * item.oldPrice;
      })
      this.setData({
        priceTotal: priceTotal.toFixed(1),
        oldPriceTotal: oldPriceTotal.toFixed(1)
      });
      return result;
    }
  },

  watch: {//监听
    selectList: function(newValue,oldValue){
      if (newValue.length == 0 && oldValue.length>0){
        this.setData({showSelectList: false});
      }
    }
  },

  selectTab: function(e){//选择导航
    let index = e.currentTarget.dataset.index;
    wx.pageScrollTo({scrollTop: 0,duration: 0});
    this.setData({tabIndex: index});
  },

  listRightScroll: function(e){//商品列表滚动
    if (e.detail.scrollTop>0){
      wx.pageScrollTo({
        scrollTop: this.data.goodsListTop,
        duration: 0
      })
    }
  },

  selectType: function(e){//选左边的类型,设置右边滚动位置
    let typeIndex = e.currentTarget.dataset.index;
    this.setData({
      typeIndex,
      rightScrollTop: this.data.goodsList[typeIndex].scrollTop
    });
  },

  reduceGoods: function(e){
    let index = parseInt(e.currentTarget.dataset.index);
    let i = parseInt(e.currentTarget.dataset.i);
    let obj = !isNaN(index) && !isNaN(i) ? this.data.goodsList[index].list[i] : this.data.scrollList[index];
    this.setSelectNum(obj.id,-1);
  },

  addGoods: function (e) {//选择添加商品
    let index = parseInt(e.currentTarget.dataset.index);
    let i = parseInt(e.currentTarget.dataset.i);
    let obj = !isNaN(index) && !isNaN(i) ? this.data.goodsList[index].list[i] : this.data.scrollList[index];
    this.setSelectNum(obj.id, 1);
  },

  setSelectNum: function(id,type){
    let tempArray1 = [].concat(this.data.scrollList);
    tempArray1.forEach((item)=>{
      if (item.id == id){item.selectNum += type;}
    })
    let tempArray2 = [].concat(this.data.goodsList);
    tempArray2.forEach((it)=>{
      it.list.forEach((item)=>{
        if (item.id == id) {//核对商品id，如果对上就修改数量
          item.selectNum += type;
          let selectedGoods = this.data.selectList.some((i) => { return i.id == item.id });//选择列表中是否有该商品
          //已选择商品并且需要减小数量再并且减少后数量为0
          //未选择商品并且需要增加数量
          if ((selectedGoods && type < 0 && item.selectNum == 0) || (!selectedGoods && type > 0)) {
            it.selectNum += type;
          }
        }
      })
    })
    this.setData({
      scrollList: tempArray1,
      goodsList: tempArray2,
      iconScale: true,//显示缩放动画
    }, () => {
      setTimeout(() => {//去除缩放动画类名
        this.setData({ iconScale: false });
      }, 500)
    })
  },

  onPageScroll: function(e){//监听滚动
    this.setData({
      tabFixed: e.scrollTop >= this.data.tabTop
    })
  },

  showSelectList: function(){//显示选择列表
    if(this.data.selectList.length>0){
      this.setData({ showSelectList: true });
    }else{
      this.hideSelectList();
    }
  },

  hideSelectList: function(){//隐藏选择列表
    this.setData({ showSelectList: false });
  },

  addSelectList: function(e){
    let id = e.currentTarget.dataset.id;
    this.setSelectNum(id,1);
  },

  reduceSelectList: function(e){
    let id = e.currentTarget.dataset.id;
    this.setSelectNum(id, -1);
  },

  clearAllSelect: function(){//清空选择的商品
    let scrollList = [].concat(this.data.scrollList);
    scrollList.forEach((item) => {item.selectNum = 0});
    let goodsList = [].concat(this.data.goodsList);
    goodsList.forEach((it)=>{
      it.selectNum = 0;
      it.list.forEach((item)=>{item.selectNum = 0});
    })
    this.setData({scrollList,goodsList});
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