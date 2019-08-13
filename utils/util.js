const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getNodeInfo = (el) => {//返回节点信息
  return new Promise((resolve) => {
    // let query = wx.createSelectorQuery().in(this)
    let query = wx.createSelectorQuery();
    query.select(el).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      resolve(res);
    })
  })
}

const deepClone = (source) => {//克隆
  if (typeof source == 'string'){
    return source + '';
  } else if (typeof source == 'number'){
    return source + 0;
  } else if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

const observe = (obj, key, callback, that) => {
  var temp = obj[key];
  Object.defineProperty(obj, key,{
    enumerable: true,
    configurable: true,
    get: function(){
      return temp;
    },
    set: function (newValue){
      callback.call(that, newValue, deepClone(temp));
      temp = newValue;
    }
  })
}

const watch = (that, watchObj) => {//监听数据
  let obj = that.data;
  Object.keys(watchObj).forEach((key)=>{
    var keys = key.split('.');//用.分割要监听的属性
    var nowData = obj;//真正要监听的对象
    for(var i=0;i < keys.length - 1;i++){//遍历属性，除了最后一个
      nowData = nowData[keys[i]];
    }
    var lastKey = keys[keys.length - 1];//真正要监听的属性
    if (typeof watchObj[key] === 'function'){
      observe(nowData, lastKey, watchObj[key], that);
    }
  })
}

function defineReactive(data, key, val, fn) {
  let subs = data['$' + key] || [] // 新增 
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      if (data.$target) {
        subs.push(data.$target)
        data['$' + key] = subs // 新增
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      fn && fn(newVal)
      if (subs.length) {
        // 用 setTimeout 因为此时 this.data 还没更新
        setTimeout(() => {
          subs.forEach(sub => sub())
        }, 0)
      }
      val = newVal
    },
  })
}


const computed = (ctx, obj) => {//计算属性
  let keys = Object.keys(obj);
  let dataKeys = Object.keys(ctx.data);
  dataKeys.forEach(dataKey => {
    defineReactive(ctx.data, dataKey, ctx.data[dataKey]);
  })
  let firstComputedObj = keys.reduce((prev, next) => {
    ctx.data.$target = function () {
      ctx.setData({ [next]: obj[next].call(ctx) });
    }
    prev[next] = obj[next].call(ctx);
    ctx.data.$target = null;
    return prev;
  }, {})
  ctx.setData(firstComputedObj);
}

module.exports = {
  formatTime,
  getNodeInfo,
  deepClone,
  watch,
  computed
}
