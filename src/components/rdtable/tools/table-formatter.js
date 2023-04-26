import { getModel } from './util'
const TableFormatter = {
  name: 'TableFormatter',
  template: `<span v-html="getFrmat"> </span>`,
  props: {
    type: String,
    row: Object,
    column: Object,
    rowIndex: Number,
    property: String, // 默认参数
    options: Object // options数据
  },
  data() {
    return {
      formatterMap: new Map()
    }
  },
  computed: {
    getFrmat() {
      // 计算单元格类型获取展示样式
      const key = this.type
      const val = this.row[this.column.field]
      // 根据类型获取相应展示样式
      if (this.formatterMap.get(key) != null) { return this.formatterMap.get(key)(val) } else { return val }
    }
  },
  created() {
    // this.init()
  },
  methods: {
    init() {
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
    },

    dateRange(val) {
      if (!val) return
      const arr = JSON.parse(val)
      return `<div class="ui yellow circular label">${arr[0]}</div>
                <div class="ui olive circular label">${arr[1]}</div>`
    },

    timeRange(val) {
      if (!val) return
      const arr = JSON.parse(val)
      return `<div class="ui yellow circular label">${arr[0]}</div>
            <div class="ui olive circular label">${arr[1]}</div>`
    },

    datetimeRange(val) {
      if (!val) return
      const arr = JSON.parse(val)
      return `<div class="ui yellow circular label">${arr[0]}</div>
      <div class="ui olive circular label">${arr[1]}</div>`
    },

    demonstration(val) {
      if (!val) return
      const arr = JSON.parse(val)
      const obj = getModel(arr, this.options[this.column.field])
      return `<span>${obj.label}</span>`
    },

    datetime(val) {
      if (!val) return
      const time = this.$moment(Date.parse(val)).format('YYYY-MM-DD hh:mm:ss')
      return '<div class="ui yellow circular label">' + time + '</div>'
    },

    date(val) {
      if (!val) return
      return `<div class="ui yellow circular label">${val}</div>`
    },

    time(val) {
      if (!val) return
      return `<div class="ui yellow circular label">${val}</div>`
    },

    checkbox(val) {
      if (!val) return
      const arr = JSON.parse(val)
      let string = ''
      arr.map(item => {
        string += '<div class="ui teal label">' + item + '</div>'
      })
      return string
    },

    color(val) {
      if (!val) return
      return `<div class="ui circular label" style="background-color: ${val}"></div>`
    },

    select(val) {
      if (!val) return
      return `<div class="ui teal tag label" ">${val}</div>`
    },

    switch(val) {
      if (typeof (val) !== 'number') return
      const property = JSON.parse(this.property)
      return val === property.active.value ? `<span class="ui teal label"><i class="file archive icon"></i>${property.active.text}</span>` : `<span class="ui grey label"><i class="copy icon"></i>${property.inactive.text}</span>`
    },

    rate(val) {
      if (typeof (val) !== 'number') return
      let string = `<div class="ui star rating">`
      let i = 1
      while (i < 6) {
        string += i <= val ? '<i class="icon active"></i>' : '<i class="icon"></i>'
        i++
      }
      string += `</div>`
      return string
    },

    radio(val) {
      if (!val) return
      const value = this.options[this.column.field].filter(item => item.id === val)[0].value
      return `<div class="ui teal tag label" ">${value}</div>`
    },

    upload(val) {
      if (!val) return
      const arr = JSON.parse(val)
      let string = ''
      arr.map(item => {
        const suffix = item.name.substring(item.name.lastIndexOf('.') + 1)
        string += ['png'].indexOf(suffix) > -1 ? `<img class="ui tiny centered rounded image" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">` : `<a class="ui small image"> <img src="/images/wireframe/image.png"> </a>`
      })

      return string
    },

    textarea(val) {
      if (!val) return
      return `<span class="haveTips" title="${val}" data-content="${val}" >${val}</span>`
    },

    composite(val) {
      if (!val) return
      return `<span class="haveTips" title="${val}" data-content="${val}" >${val}</span>`
    },

    format(key, val) {
      if (key === 'date_range') return this.formatterMap.get(key)(val)
      return val
      // eslint-disable-next-line no-unreachable
      if (this.formatterMap.get(key) != null) { return this.formatterMap.get(key)(val) } else { return val }
    }
  }
}

export { TableFormatter }
