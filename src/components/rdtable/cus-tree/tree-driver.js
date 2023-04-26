import {
  isEmpty,
  orderCall,
  toAsync
} from '../tools/util'

// const TEST_FORM = false

export default class TreeDriver {
  constructor() {
    // 存放表头数据
    this.jsonForm = null

    // 存放表单数据
    this.model = {}

    // 操纵的list vue组件
    this.rdTree = null

    // 列表数据
    this.listData = []

    // 查询的变量
    this.listQuery = {
      total: 0,
      page_index: 1,
      page_size: 10,
      sorters: []
    }

    // 存储状态id
    this.changedId = null
  }

  // 初始化接口
  onInit(tree) {
    // 保存指定的rdTree VUE组件
    this.rdTree = tree

    // 在rdTree VUE组件保存list-driver
    this.rdTree.treeDriver = this
  }

  tryAdd() {
    this.rdTree.tryAdd()
  }

  /**
   * 封装了向后台读取form定义的操作，也可以在本地直接写死
   * @param {*} request
   * @returns
   */
  onAskForm(request) {
    // 如果没有设置jsonForm数据，则从远程获取
    if (this.jsonForm == null) {
      return toAsync(this, function(that, resolve, reject) {
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
            that.rdTree.buildFields(that.jsonForm)
            resolve(true)
          } else {
            resolve(false)
            console.log(rsp)
            // that.fail(rsp.message)
          }
        })
      })
    } else {
      return toAsync(this, function(that, resolve, reject) {
        // 动态添加表头数据
        that.rdTree.buildFields(that.jsonForm)
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
  onAskList(request) {
    return toAsync(this, function(that, resolve, reject) {
      request.then((rsp) => {
        if (rsp && rsp.code === 200) {
          console.log('@onAskList rsp=>', rsp.code, rsp)
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
          // that.rdTree.buildFields(that.jsonForm)
          that.rdTree.buildFields(that.jsonForm)
          // 设置分页器数量
          resolve(true)
        } else {
          resolve(false)
          this.rdTree.$message.error(rsp.message)
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
  onAskOptions(name, request) {
    return toAsync(this, function(that, resolve, reject) {
      request.then((rsp) => {
        console.log('@onAskOptions rsp=>', rsp.code, rsp)
        if (rsp.code === 200) {
          // 复制数据的一份copy
          that.rdTree.options[name] = rsp.data.map(item => {
            return item
          })
          resolve(true)
        } else {
          resolve(false)
          this.rdTree.$message.error(rsp.message)
        }
      })
    })
  }

  onAskAction() {

  }

  /**
   *  封装从后台获取列表数据的操作
   */
  doList() {
    var fun_list = this.onAskList(this.onList(this.listQuery))
    orderCall(fun_list)
  }

  /**
   * 封装从后台获取一行数据的操作
   * @param {*} id
   * @returns
   */
  doGet(id) {
    const that = this
    const request = this.onGet(id)
    return request.then((rsp) => {
      console.log('@doGet rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 复制数据的一份copy
        that.rdTree.model = Object.assign({}, rsp.data)
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        this.rdTree.$message.error(rsp.message)
        return Promise.resolve(false)
      }
    })
  }

  /**
   * 封装从后台删除一行数据的操作
   * @param {*} id
   * @returns
   */
  doDel(id) {
    const request = this.onDel(id)
    return request.then((rsp) => {
      console.log('@doDel rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 更新数据
        this.doList()
        this.rdTree.$message.success('删除成功！')
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        this.rdTree.$message.error(rsp.message)
      }
    })
  }

  /**
   * 封装向后台添加一行数据的操作
   * @param {*} id
   * @returns
   */
  doAdd(model) {
    const request = this.onAdd(model)
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
  doUpdate(model) {
    const request = this.onUpdate(model)
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
  doSubmit(model) {
    console.log('@@@submit model=>', model)
    if (isEmpty(model.id)) {
      this.doAdd(model).then(rsp => {
        if (rsp) {
          // 更新数据
          this.doList()

          this.rdTree.$message({
            type: 'success',
            message: '添加记录成功!'
          })
        } else {
          this.rdTree.$message({
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

          this.rdTree.$message({
            type: 'success',
            message: '更新记录成功!'
          })
        } else {
          this.rdTree.$message({
            type: 'error',
            message: '更新记录失败!'
          })
        }
      })
    }
  }

  /**
   * 按钮提示框
   * @param msg
   * @returns {Promise<unknown>}
   */
  onMessage(msg) {
    return new Promise( (resolve, reject) => {
      this.rdTree.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resolve(true)
      }).catch(() => {
        reject(false)
      })
    })
  }

  /**
   手工设置option
   @param {*} name
   @param {*} option
   @returns
   */
  setOptions(name, option) {
    this.rdTree.options[name] = option.map(item => {
      return item
    })
    return this
  }

  /** *********************************************************************************************************************************** */
  // 这里应该return相应的 list接口
  onList() {
    console.log('override me! =>onList')
  }

  // 这里应该return相应的 add接口
  // eslint-disable-next-line no-unused-vars
  onGet(id) {
    console.log('override me! =>onGet')
  }

  // 这里应该return相应的 add接口
  // eslint-disable-next-line no-unused-vars
  onAdd(model) {
    console.log('override me! =>onAdd')
  }

  // 这里应该return相应的 update接口
  // eslint-disable-next-line no-unused-vars
  onUpdate(model) {
    console.log('override me! =>onUpdate')
  }

  // 这里应该return相应的 del接口
  // eslint-disable-next-line no-unused-vars
  onDel(id) {
    console.log('override me! =>onDel')
  }

  // 这里添加表头数据
  onForm(json) {
    console.log('add me! =>onForm')
    this.jsonForm = json
  }

  /**
   * 单个标签选中
   * @param node
   */
  onState(nodelId) {
    console.log('node me! =>onState')
    if (nodelId === this.changedId) { return }
    //　改变当前状态
    const newNode = this.rdTree.$refs['tree'].tree.getNodeById(nodelId)
    newNode.states.selected = true
    // 还原初始状态
    if (!!this.changedId) {
      const oldNode = this.rdTree.$refs['tree'].tree.getNodeById(this.changedId)
      oldNode.states.selected = false
    }

    this.changedId = newNode.id
  }
}
