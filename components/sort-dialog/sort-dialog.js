// components/sort-dialog/sort-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    top: {
      type: String,
      value: '0'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    sortIndex: 0,
    sortList: [
      { text: '综合排序', key: 'zhpx' },
      { text: '好评优先', key: 'hpyx' },
      { text: '销量最高', key: 'xlzg' },
      { text: '起送价最低', key: 'qsjzd' },
      { text: '配送最快', key: 'pszk' },
      { text: '配送费最低', key: 'psfzd' },
      { text: '人均从低到高', key: 'rjcddg' },
      { text: '人均从高到低', key: 'rjcgdd' },
      { text: '通用排序', key: 'typx' }
    ],
    screenList: [
      {
        title: '配送方式',
        isMultiple: false,
        list: [
          { text: '蜂鸟专送', active: false, icon: '',key: 'fnzs' }
        ]
      },
      {
        title: '优惠活动',
        isMultiple: false,
        list: [
          { text: '首单立减', active: false, icon: '/static/img/screen-1.png', key: 'sdlj' },
          { text: '门店新客立减', active: false, icon: '/static/img/screen-2.png', key: 'mdxklj' },
          { text: '满减优惠', active: false, icon: '/static/img/screen-3.png', key: 'mjyh' },
          { text: '下单返红包', active: false, icon: '/static/img/screen-4.png', key: 'xdfhb' },
          { text: '进店领红包', active: false, icon: '/static/img/screen-5.png', key: 'jdlhb' },
          { text: '配送费优惠', active: false, icon: '/static/img/screen-6.png', key: 'psfyh' },
          { text: '赠品优惠', active: false, icon: '/static/img/screen-7.png', key: 'zpyh' },
          { text: '特价商品', active: false, icon: '/static/img/screen-8.png', key: 'tjsp' },
          { text: '品质联盟红包', active: false, icon: '/static/img/screen-9.png', key: 'pzlmhb' },
        ]
      },
      {
        title: '商家属性(可多选)',
        isMultiple: true,
        list: [
          { text: '准时达', active: false, icon: '/static/img/screen-10.png', key: 'zsd' },
          { text: '品牌商家', active: false, icon: '/static/img/screen-11.png', key: 'ppsj' },
          { text: '新店', active: false, icon: '/static/img/screen-12.png', key: 'xd' },
          { text: '食安保', active: false, icon: '/static/img/screen-13.png', key: 'sab' },
          { text: '开发票', active: false, icon: '/static/img/screen-14.png', key: 'kfp' },
        ]
      }
    ],
    singleList: [
      { text: '排序', key: '' },
      { text: '距离最近', key: 'jlzj' },
      { text: '品质联盟', key: 'pzlm' },
      { text: '筛选', key: '' },
    ],
    activeSort: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleShow: function(){//显示或隐藏弹框
      //弹框显示时点击上面四个选项的第一(0)和第四项(3)会触发这个function两次，刚好避免冒泡事件触发隐藏掉弹框
      this.setData({
        show: !this.data.show
      })
    },
    selectKey: function(resultArray){
      this.triggerEvent('selectedEvent', resultArray);
    },
    selectSort: function (e) {//选择类型
      this.setData({sortIndex: e.currentTarget.dataset.sortindex});
      let index = parseInt(e.currentTarget.dataset.sortindex);
      switch (index){
        case 0: case 3: //第一(0)和第四项(3)
          this.toggleShow();
          break;
        case 1: case 2: //选择中间两项
          this.selectKey([this.data.singleList[index]]);
          this.setData({ activeSort: 0 });//清空排序
          this.clear();//清空筛选
          break;
      }
    },
    selectRow: function(e){//选择排序
      let {key,index,text} = e.currentTarget.dataset;
      this.setData({
        activeSort: index
      })
      this.clear();//清空筛选
      this.selectKey([this.data.sortList[index]]);
    },
    selectScreen: function(e){//选择筛选
      let key = e.currentTarget.dataset.key;
      let findex = e.currentTarget.dataset.findex;
      let tempList = [].concat(this.data.screenList);
      let isMultiple = tempList[findex].isMultiple;//是否多选
      tempList[findex].list.forEach(function(item){
        if (isMultiple){//多选
          item.active = item.key == key ? !item.active : item.active;
        }else{//单选
          item.active = item.key == key ? !item.active : false;
        }
      })
      this.setData({screenList: tempList});//赋值
    },
    clear: function(){//清空筛选
      let tempList = [].concat(this.data.screenList);
      tempList.forEach(function(it){
        it.list.forEach(function(item){
          item.active = false;
        })
      })
      this.setData({ screenList: tempList });//赋值
    },
    sure: function(){//确定筛选
      let result = [];
      this.data.screenList.forEach(function (it) {
        it.list.forEach(function (item) {
          if (item.active){
            result.push(item);
          }
        })
      })
      if (result.length>0){
        this.selectKey(result);
        this.setData({
          show: false,
          activeSort: 0//清空排序
        })
      }
    },
    clearAll(){//清空全部的选择
      this.clear();
      this.setData({ 
        activeSort: 0,
        sortIndex: 0
      });
    }
  }
})
