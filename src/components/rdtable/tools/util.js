export function isEmpty(obj) {
  return (obj === '' || obj == null || typeof obj === 'undefined')
}

/**
 * @param {Object} args,必须全是异步async的函数
 * 返回的是包含最终结果的promise
 */

// eslint-disable-next-line no-unused-vars
export function orderCall(...args) {
  return orderRun(arguments)
}

/**
 * @param {Object} funArr
 * 执行一个异步async函数数组。返回的是包含最终结果的promise
 */
export function orderRun(funArr) {
  return (async () => {
    // uni.showLoading()
    var result = true
    for (let i = 0; i < funArr.length; i++) {
      var out = await funArr[i]()
      if (isEmpty(out)) {
        result = false
        break
      }
    }
    return result
  })()

}
/**
 * @param {Object} obj,为了方便处理传入的类似全局变量，便于内部操作
 * @param {Object} resolve
 * @param {Object} reject
 */
// eslint-disable-next-line no-unused-vars
export function toAsync(_that, handler = function (obj, resolve, reject) {}) {

  var that = _that
  return async function () {
    // 给that动态增加报错接口,不给提示
    that.failCode = function(errCode) {
    // 异常了就关闭loading，注意要放在showToast前,否则toast显示不出来
    // uni.hideLoading()
      throw Error(errCode)
    // throw Error(errMsg, errCode)
    // }
    // 给that动态增加报错接口
    // that.fail = function(errMsg = "加载失败，请重试!", errCode = 10000) {
    // 异常了就关闭loading，注意要放在showToast前,否则toast显示不出来
    // uni.hideLoading()
    /* if(105!=errCode)
				uni.showToast({
					title: errMsg,
					icon: 'none',
				}); */
    // throw Error(errMsg, errCode)
    // }
    // 给that动态增加报错接口
    // that.failTo = function(url,errMsg = "加载失败，请重试!", errCode = 10000) {
    // 异常了就关闭loading，注意要放在showToast前,否则toast显示不出来
    // uni.hideLoading()
    /* if(105!=errCode)
				failToast(errMsg,url) */
    // throw Error(errMsg, errCode)
    }
    return await new Promise(function (resolve, reject) {
      // 发起请求，回调handler来处理response,出错UI直接提示了
      try {
        handler(that, resolve, reject)
      } catch (e) {
        console.log('toAsync err================>', e)
        // 异常了就关闭loading，注意要放在showToast前,否则toast显示不出来
        // wx.hideLoading()
        /* uni.showToast({
					title: e.message,
					icon: 'none',
				}); */
        reject()
      }
    })
  }
}

// 级联选择器赋值dataForm数据
export function getModel (val, options) {
  let i = 0
  let list = options
  let obj = {}
  while (i < val.length) {
    i === 0 ? obj = getChildren(list, val[i]) : obj = getChildren(obj.children, val[i])
    i++
  }
  return obj
}

// 递归获取级联数据
function getChildren (list, val) {
  let res = {}
  for (let index in list) {
    if (list[index].value === val) {
      res = list[index]
    }
  }
  return res
}

