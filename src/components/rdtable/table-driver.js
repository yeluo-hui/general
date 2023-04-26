import {
  isEmpty,
  orderCall,
  toAsync
} from './tools/util'

// const TEST_FORM = false

export default class TableDriver {
  constructor () {
    // 存放表头数据
    this.jsonForm = null

    // 存放表单数据
    this.model = {}

    // 操纵的table vue组件
    this.rdTable = null

    // 列表数据
    this.tableData = []

    // 查询的变量
    this.listQuery = {
      total: 0,
      page_index: 1,
      page_size: 10,
      sorters: []
    }
    // 操作事件
    this.actions = []

    this.defaultActions = [{ action: 'edit', label: '编辑' }, { action: 'del', label: '删除' }]

    // tree操作事件- 后台接口
    // this.treeActions = [{ action: 'add', label: '添加子节点' }, { action: 'edit', label: '修改节点' },{ action: 'del', label: '删除' }]
    // 动态修改
    this.treeActions = [{ action: 'addNode', label: '添加子节点' }, { action: 'editNode', label: '修改节点' }, { action: 'delNode', label: '删除' }]
  }

  // 初始化接口
  onInit (table) {
    console.log('@table=>', table)
    // 保存指定的rdTable VUE组件
    this.rdTable = table

    // 在rdTable VUE组件保存table-driver
    this.rdTable.tableDriver = this

    return this
  }

  tryAdd (model = {}) {
    this.rdTable.tryAdd(model)
  }

  /**
   * 添加子节点
   * @param parentId
   */
  tryAddNode (parentId) {
    this.rdTable.tryAddNode(parentId)
  }

  /**
   * 编辑node
   * @param node
   */
  onSubmitNode (node) {
    this.rdTable.onSubmitNode(node)
  }

  /**
   * 获取tree 数据
   */
  getTreeData () {
    return this.rdTable.getTreeData()
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
            that.rdTable.buildFields(that.jsonForm)
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

        that.rdTable.buildFields(that.jsonForm)
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
    const self = this
    this.rdTable.loading = true
    if (!this.tableData.length) {
      return toAsync(this, function (that, resolve, reject) {
        request.then((rsp) => {
          console.log('@onAskList rsp=>', rsp.code, rsp)

          if (rsp.code === 200) {
          // 复制数据的一份copy
            if (rsp.data.length) {
              that.rdTable.tableData = rsp.data.map((item, index) => {
                // 添加序号
                if (that.rdTable.numVis) item.number = index + 1

                return item
              })
            } else {
              that.rdTable.tableData = []
              that.rdTable.$message.info('未查询到数据！')
            }
            that.rdTable.loading = false
            // 设置分页器数量
            that.rdTable.listQuery.total = rsp.total ? rsp.total : 0
            // 查设备出现bug
            that.rdTable.listQuery.page_index = self.listQuery.page_index
            // if (!rsp.total) {
            //   that.rdTable.$message.warning(rsp.message)
            // }
            resolve(true)
          } else {
            resolve(false)
            this.rdTable.$message.error(rsp.message)
          }
        })
      })
    } else {
      return toAsync(this, function (that, resolve, reject) {
        // 动态添加表头数据

        // 复制数据的一份copy
        that.rdTable.tableData = that.tableData.map((item, index) => {
          // 添加序号
          if (that.rdTable.numVis) item.number = index + 1

          return item
        })
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
          that.rdTable.options[name] = rsp.data.map(item => {
            return item
          })
          resolve(true)
        } else {
          resolve(false)
          this.rdTable.$message.error(rsp.message)
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
    const that = this
    const request = this.onGet(id)
    return request.then((rsp) => {
      console.log('@doGet rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 复制数据的一份copy
        that.rdTable.model = Object.assign({}, rsp.data)
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        this.rdTable.$message.error(rsp.message)
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
    const request = this.onDel(id)
    return request.then((rsp) => {
      console.log('@doDel rsp=>', rsp.code, rsp)
      if (rsp.code === 200) {
        // 更新数据
        this.doList('del')
        this.rdTable.$message.success('删除成功！')
        // 是下一步能使用then
        return Promise.resolve(true)
      } else {
        this.rdTable.$message.error(rsp.message)
      }
    })
  }

  /**
   * 封装向后台添加一行数据的操作
   * @param {*} id
   * @returns
   */
  doAdd (model) {
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
  doUpdate (model) {
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
  doSubmit (model) {
    console.log('@@@submit model=>', model)
    if (isEmpty(model.id)) {
      this.doAdd(model).then(rsp => {
        if (rsp) {
          // 更新数据
          this.doList('add')

          this.rdTable.$message({
            type: 'success',
            message: '添加记录成功!'
          })
        } else {
          this.rdTable.$message({
            type: 'error',
            message: '添加记录失败!'
          })
        }
      })
    } else {
      this.doUpdate(model).then(rsp => {
        if (rsp) {
          // 更新数据
          this.doList('edit')

          this.rdTable.$message({
            type: 'success',
            message: '更新记录成功!'
          })
        } else {
          this.rdTable.$message({
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
    this.rdTable.options[name] = option.map(item => {
      return item
    })
    return this
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

  // 这里添加操作接口1.actions作为属性录入[{action:"del",label:"删除"}]，同时增加一个事件onAction 事件，将用户按键输出，其中更新和删除属于内置项；如果action为[], 则不显示任何action
  onAction (actions) {
    console.log('add me! =>onAction')
    // 添加属性表格操作
    if (this.rdTable && this.rdTable.type && this.rdTable.type.includes('tree')) {
      this.actions = actions && actions.length ? this.treeActions : []
    } else {
      this.actions = actions && actions.length ? [...actions, ...this.defaultActions] : actions ? (actions.length === 0 ? [] : [actions]) : this.defaultActions
    }
    console.log('add me! =>onAction', this.actions)
  }

  /**
   * 对操作进行处理
   * @param fi
   * @param row
   * @returns {boolean}
   */
  actionFilter (fi, row) {
    return true
  }

  /**
   * 重构action
   * @param et
   * @param row
   * @returns {boolean}
   */
  actionEditor (et, row) {
    return et
  }

  // 这里添加表头数据
  onForm (json) {
    console.log('add me! =>onForm')
    this.jsonForm = json
  }

  // 设置显影
  onPageVis (vis) {
    this.rdTable.pageVis = vis
    return this
  }

  // 获取多选id
  getCheck () {
    return this.rdTable.$refs['cusTable'].checkboxOption.selectedRowKeys
  }

  // treeTable高亮设置
  onHighlight () {
    return this.rdTable.$refs['cusTable'].rowData
  }

  // 全部折叠
  onFold () {
    this.rdTable.$refs['cusTable'].onFold()
  }

  // 设置数据
  onJsonData (data) {
    console.log('add me! =>onJsonData')
    this.tableData = data
    this.rdTable.tableData = data.map((item, index) => {
      // 添加序号
      if (this.rdTable.numVis) item.number = index + 1

      return item
    })
    // 设置分页器数量
    this.rdTable.listQuery.total = this.total ? this.total : 0
  }

  // 设置默认选中数据 -check
  setDefaultSelectedRowKeys (rowKeys) {
    this.rdTable.$refs['cusTable'].setDefaultSelectedRowKeys(rowKeys)
  }

  // 获取默认选中数据 -check
  getSelectedRowKeys () {
    return this.rdTable.$refs['cusTable'].getSelectedRowKeys()
  }

  // 获取默认选中数据 -check/ radio
  getSelectedRows () {
    return this.rdTable.$refs['cusTable'].getSelectedRows()
  }
}
