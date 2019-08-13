/*
*注意这个方法会改变原数组
*没有考虑不是中文的情况
*/
var wxSortPickerView = require('./wxSortPickerView.js')

module.exports = function (arr, pro) {//数组、要排序的属性没有传参数就直接排序数组每一项
  var letters = "ABCDEFGHJKLMNOPQRSTWXYZ#".split('');
  var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
  var result = function () {
    var res = [];
    for (var i = 0; i < letters.length; i++) {
      res[i] = {
        key: letters[i],
        list: []
      };
    }
    return res;
  }();
  var isString = function (str) {//判断是否字符
    return Object.prototype.toString.call(str) === '[object String]';
  }

  //先把数组排序好
  // arr.sort(function (a, b) {
  //   if (isString(pro) && isString(a[pro]) && isString(b[pro])) {//pro参数存在并且a和b都有这个属性
  //     a = a[pro];
  //     b = b[pro];
  //     return a.localeCompare(b);
  //   } else {
  //     return 0;
  //   }
  // })

  // var temp = '';
  // //根据A-Z排序
  // for (var i in arr) {
  //   temp = arr[i];
  //   if (isString(pro) && isString(arr[i][pro])) {//pro参数存在并且arr[i]有这个属性
  //     temp = arr[i][pro];
  //   }
  //   var j = 0;
  //   for (j = 0; j < zh.length; j++) {
  //     if (temp.localeCompare(zh[j]) === -1) {
  //       --j;
  //       break;
  //     }
  //   }
  //   if (j !== zh.length) {//如果匹配到存入result
  //     result[j].list.push(arr[i]);
  //   }
  // }

  for (var i in arr) {
    var temp = arr[i];
    if (isString(pro) && isString(arr[i][pro])) {//pro参数存在并且arr[i]有这个属性
      temp = arr[i][pro];
    }

    var firstChat = temp.substr(0,1);
    var reg = wxSortPickerView.query(firstChat)[0];
    var index = letters.indexOf(reg);
    result[index].list.push(arr[i]);
  }
  
  return result;
}