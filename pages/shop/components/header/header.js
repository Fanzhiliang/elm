// pages/shop/components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowMore: false,
    dialogStatus: '',//show  hide
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleShowMore: function(){
      this.setData({
        isShowMore: !this.data.isShowMore
      })
    },
    showDialog: function(){
      this.setData({dialogStatus: 'show'});
    },
    hideDialog: function(){
      this.setData({dialogStatus: 'hide'});
    }
  }
})
