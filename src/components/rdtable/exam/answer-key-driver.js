import {
  isEmpty,
  orderCall,
  toAsync
} from '../tools/util'

// const TEST_FORM = false

export default class answerKeyDreverDriver {
  constructor () {
    // 存放表头数据
    this.jsonForm = null

    // 存放表单数据
    this.model = {}

    // 操纵的list vue组件
    this.answerKeyDrever = null

    // 列表数据
    this.listData = []

    // 查询的变量
    this.listQuery = {
      total: 0,
      page_index: 1,
      page_size: 10,
      sorters: []
    }

  }

  // 初始化接口
  onInit (list) {
    // 保存指定的answerKeyDrever VUE组件
    this.answerKeyDrever = list

    // 在answerKeyDrever VUE组件保存list-driver
    this.answerKeyDrever.listDriver = this
  }

  tryAdd () {
    this.answerKeyDrever.tryAdd()
  }

  /**
   * 封装了向后台读取form定义的操作，也可以在本地直接写死
   * @param {*} request
   * @returns
   */
  onAskForm (request) {
    // 如果没有设置jsonForm数据，则从远程获取
    if (this.jsonForm == null) {
      return toAsync(this, function (that, resolve, reject) {
        // 这里使用的that都是page
        request.then(rsp => {
          console.log('@onAskForm rsp=>', rsp.code, rsp)
          if (rsp.code == 200) {
            // 复制数据的一份copy
            that.jsonForm = rsp.data.map(item => {
              return item
            })
            // 只有id不存在时才将默认值放入
            // console.log('getForm=>', that.model.id, that.model)
            // if (isEmpty(that.model.id)) {
            //   that.model = Object.assign({}, rsp.default)
            // }
            // that.page.forceUpdate(that) // 强制更新，其实没有props都可以了
            that.answerKeyDrever.buildFields(that.jsonForm)
            resolve(true)
          } else {
            resolve(false)
            console.log(rsp)
            // that.fail(rsp.message)
          }
        })
      })
    } else {
      return toAsync(this, function (that, resolve, reject) {
        // 动态添加表头数据
        that.answerKeyDrever.buildFields(that.jsonForm)
        // 这里使用的that都是page
        /* that.items.length = 0
        that.items = that.jsonForm.map(item => {
          return item
        })

        if (isEmpty(that.model.id)) {
          that.model = Object.assign({}, that.jsonForm.default)
        }
        // that.update=driver.newGuid()
        that.page.forceUpdate(that) */
        resolve(true)
      })
    }
  }

  /**
   * 封装了向后台获取数据列表的操作
   * @param {*} request
   * @returns
   */
  onAskList (request) {
    return toAsync(this, function (that, resolve, reject) {
      request.then((rsp) => {
        console.log('@onAskList rsp=>', rsp.code, rsp)
        if (rsp.code === 200) {
          // 复制数据的一份copy
          // 复制数据的一份copy
          that.jsonForm = rsp.data.map(item => {
            return item
          })
          // 只有id不存在时才将默认值放入
          // console.log('getForm=>', that.model.id, that.model)
          // if (isEmpty(that.model.id)) {
          //   that.model = Object.assign({}, rsp.default)
          // }
          // that.page.forceUpdate(that) // 强制更新，其实没有props都可以了
          that.answerKeyDrever.buildFieldsCopy(that.jsonForm)
          // 设置分页器数量
          that.answerKeyDrever.listQuery.total = rsp.total
          resolve(true)
        } else {
          resolve(false)
          this.answerKeyDrever.$message.error(rsp.message)
        }
      })
    })
  }

  /**
   * 封装了向后台获取一个option的操作
   * @param {*} name
   * @param {*} request
   * @returns
   */
  onAskOptions (name, request) {
    return toAsync(this, function (that, resolve, reject) {
      request.then((rsp) => {
        console.log('@onAskOptions rsp=>', rsp.code, rsp)
        if (rsp.code === 200) {
          // 复制数据的一份copy
          that.answerKeyDrever.options[name] = rsp.data.map(item => {
            return item
          })
          resolve(true)
        } else {
          resolve(false)
          this.answerKeyDrever.$message.error(rsp.message)
        }
      })
    })
  }

  onAskAction () {

  }

  /**
   *  封装从后台获取列表数据的操作
   */
  doList () {
    var fun_list = this.onAskList(this.onList(this.listQuery))
    orderCall(fun_list)
  }

  /**
   * 封装从后台获取一行数据的操作
   * @param {*} id
   * @returns
   */
  doGet (id) {
    let that = this
    let request = this.onGet(id)
    return request.then((rsp) => {
      console.log('@doGet rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 复制数据的一份copy
        that.answerKeyDrever.model = Object.assign({}, rsp.data)
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        this.answerKeyDrever.$message.error(rsp.message)
        return Promise.resolve(false)
      }
    })
  }

  /**
   * 封装从后台删除一行数据的操作
   * @param {*} id
   * @returns
   */
  doDel (id) {
    let request = this.onDel(id)
    return request.then((rsp) => {
      console.log('@doDel rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 更新数据
        this.doList()
        this.answerKeyDrever.$message.success('删除成功！')
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        this.answerKeyDrever.$message.error(rsp.message)
      }
    })
  }

  /**
   * 封装向后台添加一行数据的操作
   * @param {*} id
   * @returns
   */
  doAdd (model) {
    let request = this.onAdd(model)
    return request.then((rsp) => {
      console.log('@doAdd rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    })
  }

  /**
   * 封装向后台更新一行数据的操作
   * @param {} id
   * @returns
   */
  doUpdate (model) {
    let request = this.onUpdate(model)
    return request.then((rsp) => {
      console.log('@doUpdate rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    })
  }

  /**
   * 处理提交两种情况，新增和更新
   * @param {*} model
   */
  doSubmit (model) {
    console.log('@@@submit model=>', model)
    if (isEmpty(model.id)) {
      this.doAdd(model).then(rsp => {
        if (rsp) {
          // 更新数据
          this.doList()

          this.answerKeyDrever.$message({
            type: 'success',
            message: '添加记录成功!'
          })
        } else {
          this.answerKeyDrever.$message({
            type: 'error',
            message: '添加记录失败!'
          })
        }
      })
    } else {
      this.doUpdate(model).then(rsp => {
        if (rsp) {
          // 更新数据
          this.doList()

          this.answerKeyDrever.$message({
            type: 'success',
            message: '更新记录成功!'
          })
        } else {
          this.answerKeyDrever.$message({
            type: 'error',
            message: '更新记录失败!'
          })
        }
      })
    }
  }

  /**
   手工设置option
   @param {*} name
   @param {*} option
   @returns
   */
  setOptions (name, option) {
    this.answerKeyDrever.options[name] = option.map(item => {
      return item
    })
    return this
  }

  /**
   * 单个标签变色
   * @param key
   */
  changeKey(question) {
    // copy一份数据
    let form =this.jsonForm.map(item => {
      // 题型
      console.log(item.questions)
      let single = item
      single.questions = item.questions.map(it => {
        //题
        if(question.questionId === it.questionId) it.finished = question.finished

        return it
      })

       return single
    })
    console.log('@===>answerForm', form)
    this.answerKeyDrever.buildFields(form)
  }

  /** *********************************************************************************************************************************** */
  // 这里应该return相应的 list接口
  onList () {
    console.log('override me! =>onList')
  }

  // 这里应该return相应的 add接口
  // eslint-disable-next-line no-unused-vars
  onGet (id) {
    console.log('override me! =>onGet')
  }

  // 这里应该return相应的 add接口
  // eslint-disable-next-line no-unused-vars
  onAdd (model) {
    console.log('override me! =>onAdd')
  }

  // 这里应该return相应的 update接口
  // eslint-disable-next-line no-unused-vars
  onUpdate (model) {
    console.log('override me! =>onUpdate')
  }

  // 这里应该return相应的 del接口
  // eslint-disable-next-line no-unused-vars
  onDel (id) {
    console.log('override me! =>onDel')
  }

  // 这里添加表头数据
  onForm (json) {
    console.log('add me! =>onForm')
    this.jsonForm = json
  }

  // 设置数据
  onJsonForm(json) {
    this.jsonForm = json.map(item => {
      return item
    })
    this.answerKeyDrever.buildFields(this.jsonForm)
  }
}
