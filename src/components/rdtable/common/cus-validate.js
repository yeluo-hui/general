var validatePass = (rule, value, callback) => {
  if (value[0] == null) {
    callback(new Error('开始时间不能为空'));
  } else {
    callback()
  }
  if (value[1] == null) {
    callback(new Error('结束时间不能为空'));
  } else {
    callback()
  }
}

var checkSpecial = (rule, value, callback) =>{
  const reg = /[`~!$^@#()&*=|{}':;',\[\]<>《》/?~！@￥……&*|{}【】‘；：”“'。，、？' ']/
  if (reg.test(value)) {
    callback(new Error('不支持特殊字符！'))
  } else {
    callback()
  }
}

var checkSemicolon = (rule, value, callback) =>{
  const reg = /[']/
  if (reg.test(value)) {
    callback(new Error('不支持英文分号！'))
  } else {
    callback()
  }
}

class CusValidate {
  constructor () {
    this.valMap = new Map()
  }
  getRules (arr) {
    let rules = []
    arr.forEach(item => {
      this.hasProperty(item, 'isRequiredStart') && item.isRequiredStart ? rules.push(this.isRequiredStart(item.msgStart)) : null
      this.hasProperty(item, 'isRequiredEnd') && item.isRequiredEnd ? rules.push(this.isRequiredEnd(item.msgEnd)) : null
      this.hasProperty(item, 'isRequired') && item.isRequired ? rules.push(this.isRequired(item.msg)) : null
      this.hasProperty(item, 'phoneR') && item.phoneR ? rules.push(this.phoneR(item.msg)) : null
      this.hasProperty(item, 'notHasSpecial') && item.notHasSpecial ? rules.push(this.notHasSpecial(item.msg)) : null
      this.hasProperty(item, 'notHasSemicolon') && item.notHasSemicolon ? rules.push(this.notHasSemicolon(item.msg)) : null
    })
    return rules
  }

  isRequired (msg) {
    return {
      required: true,
      message: msg,
      trigger: ['blur', 'change']
    }
  }

  isRequiredStart (msg) {
    return {
      validator: validatePass,
      required: true,
      message: msg,
      trigger: ['blur', 'change']
    }
  }

  isRequiredEnd (msg) {
    return {
      validator: validatePass,
      required: true,
      message: msg,
      trigger: ['blur', 'change']
    }
  }

  notHasSpecial (msg) {
    return {
      validator: checkSpecial,
      required: true,
      message: msg || '不支持特殊字符!',
      trigger: ['blur', 'change']
    }
  }

  notHasSemicolon (msg) {
    return {
      validator: checkSemicolon,
      required: true,
      message: msg || '不支持英文分号!',
      trigger: ['blur', 'change']
    }
  }

  phoneR (msg) {
    return {
      pattern: '^[1][3,4,5,6,7,8,9][0-9]{9}$',
      message: msg,
      trigger: ['blur', 'change']
    }
  }

  hasProperty(data, key) {
    return Object.hasOwnProperty.call(data, key)
  }


}

export default CusValidate
