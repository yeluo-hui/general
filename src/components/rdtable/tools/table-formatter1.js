import {getModel} from './util'

class TableFormatter {
  constructor () {
    this.formatterMap = new Map()
    this.vm = null
  }

  init (vm) {
    this.vm = vm
    this.formatterMap.set('switch', this.switch)
      .set('date_range', this.dateRange)
      .set('time_range', this.timeRange)
      .set('datetime_range', this.datetimeRange)
      .set('demonstration', this.demonstration)
      .set('datetime', this.datetime)
      .set('time', this.time)
      .set('date', this.date)
      .set('checkbox', this.checkbox)
      .set('color', this.color)
      .set('select', this.select)
      .set('rate', this.rate)
      .set('radio', this.radio)
      .set('upload', this.upload)
      .set('textarea', this.textarea)
      .set('select', this.select)
      .set('composite', this.composite)
  }

  dateRange (val) {
    if (!val) return
    // eslint-disable-next-line no-unused-vars
    let arr = JSON.parse(val)
    // eslint-disable-next-line standard/no-callback-literal
    return <span><el-tag type="success">标签二</el-tag>
      <el-tag type="warning">标签四</el-tag></span>
  }

  timeRange (val) {
    return val
    if (!val) return
    let arr = JSON.parse(val)
    return <span><div class="ui yellow circular label">{arr[0]}</div>
      <div class="ui olive circular label">{arr[1]}</div></span>
  }

  datetimeRange (val) {
    return val
    if (!val) return
    let arr = JSON.parse(val)
    return <span><div class="ui yellow circular label">{arr[0]}</div>
      <div class="ui olive circular label">{arr[1]}</div></span>
  }

  demonstration (val) {
    return val
    if (!val) return
    let arr = JSON.parse(val)
    let obj = getModel(arr, this.options[this.column.field])
    return <span>{obj.label}</span>
  }

  datetime (val) {
    return val
    if (!val) return
    let time = this.$moment(Date.parse(val)).format('YYYY-MM-DD hh:mm:ss')
    return <div class="ui yellow circular label">{time}</div>
  }

  date (val) {
    return val
    if (!val) return
    return <div class="ui yellow circular label">{val}</div>
  }

  time (val) {
    return val
    if (!val) return
    return <div class="ui yellow circular label">{val}</div>
  }

  checkbox (val) {
    return val
    if (!val) return
    let arr = JSON.parse(val)
    let string = ''
    string = arr.map(item => {
      <div class="ui teal label">{item}</div>
    })
    return string
  }

  color (val, ele) {
    return val
    if (!val) return
    return val//<div class="ui circular label" :style="background-color: {val}"></div>
  }

  select (val) {
    return val
    if (!val) return
    return <div class="ui teal tag label">{val}</div>
  }

  switch (val) {
    return val
    if (typeof (val) !== 'number') return
    let property = JSON.parse(this.property)
    return val === property.active.value ? <span class="ui teal label"><i class="file archive icon"></i>{property.active.text}</span> : <span class="ui grey label"><i class="copy icon"></i>{property.inactive.text}</span>
  }

  rate (val) {
    return val
    if (typeof (val) !== 'number') return
    let string = `<div class="ui star rating">`
    let i = 1
    while (i < 6) {
      string += i <= val ? '<i class="icon active"></i>' : '<i class="icon"></i>'
      i++
    }
    string += `</div>`
    return string
  }

  radio (val) {
    return val
    if (!val) return
    let value = this.options[this.column.field].filter(item => item.id === val)[0].value
    return `<div class="ui teal tag label" ">${value}</div>`
  }

  upload (val) {
    return val
    if (!val) return
    let arr = JSON.parse(val)
    let string = ''
    arr.map(item => {
      let suffix = item.name.substring(item.name.lastIndexOf('.') + 1)
      string += ['png'].includes(suffix) ? `<img class="ui tiny centered rounded image" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">` : `<a class="ui small image"> <img src="/images/wireframe/image.png"> </a>`
    })

    return string
  }

  textarea (val) {
    return val
    if (!val) return
    return `<span class="haveTips" title="${val}" data-content="${val}" >${val}</span>`
  }

  composite (val) {
    return val
    if (!val) return
    return `<span class="haveTips" title="${val}" data-content="${val}" >${val}</span>`
  }

  format (key, val) {
    return val
    if (key === 'date_range') return this.formatterMap.get(key)(val)
    return val
    // eslint-disable-next-line no-unreachable
    if (this.formatterMap.get(key) != null) {
      return this.formatterMap.get(key)(val)
    } else {
      return val
    }
  }
}
export { TableFormatter }

