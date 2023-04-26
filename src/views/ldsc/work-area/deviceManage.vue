<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title-img">设备管理</span>
    </div>
    <div>
      <el-row>
        <el-col>
          <el-button>添加设备</el-button>
        </el-col>
        <el-col>
          <el-button>修改</el-button>
        </el-col>
        <el-col>
          <el-button>删除</el-button>
        </el-col>
      </el-row>
      <ve-table
          border-y
          fixed-header
          :max-height="300"
          :columns="columns"
          :table-data="tableData"
          :footer-data="footerData"
          :cell-style-option="cellStyleOption"
          rowKeyFieldName="rowKey"
          :checkbox-option="checkboxOption"
          :event-custom-option="eventCustomOption"
      />
    </div>

  </el-card>
</div>
</template>

<script>
export default {
  name: "areaStatistics",
  data() {
    return {
      rowData: [],
      cellStyleOption: {
        footerCellClass: ({ row, column, rowIndex }) => {
          if (column.field === "address") {
            return "table-footer-cell-class1";
          }
        },
      },
      columns:[
        { field: "col1", key: "1", title: "序号", width: "10%" },
        { field: "col1", key: "2", title: "锚段", width: "10%" },
        {
          title: "基础测量数据 - 导高值",
          children: [
            {
              field: "col3",
              key: "21",
              title: "总支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "22",
              title: "检测支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "23",
              title: "合格支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "24",
              title: "A类缺陷数",
              width: 110,
            },
            {
              field: "col3",
              key: "25",
              title: "B类缺陷数",
              width: 110,
            },
            {
              field: "col3",
              key: "26",
              title: "未检测支柱数",
              width: 110,
            }
          ],
        },
        {
          title: "基础测量数据 - 拉出值",
          children: [
            {
              field: "col3",
              key: "31",
              title: "总支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "32",
              title: "检测支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "33",
              title: "合格支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "34",
              title: "A类缺陷数",
              width: 110,
            },
            {
              field: "col3",
              key: "35",
              title: "B类缺陷数",
              width: 110,
            },
            {
              field: "col3",
              key: "36",
              title: "未检测支柱数",
              width: 110,
            }
          ],
        },
        {
          title: "线岔中心测量数据 - 偏差值",
          children: [
            {
              field: "col3",
              key: "41",
              title: "检测支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "42",
              title: "合格支柱数",
              width: 110,
            },
            {
              field: "col3",
              key: "43",
              title: "A类缺陷数",
              width: 110,
            },
            {
              field: "col3",
              key: "44",
              title: "B类缺陷数",
              width: 110,
            }
          ],
        }
      ],
      tableData: [],
      footerData: [],
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }) => {
          return {
            click: (event) => {
              const currentRowKey = row["rowKey"];
              this.changeSelectedRowKeysByRowClick(currentRowKey);
            },
          };
        },
      },
      checkboxOption: {
        // 可控属性
        selectedRowKeys: [],
        // 行选择改变事件
        selectedRowChange: ({ row, isSelected, selectedRowKeys }) => {},
        // 全选改变事件
        selectedAllChange: ({ isSelected, selectedRowKeys }) => {
          this.changeSelectedRowKeys(selectedRowKeys);
        },
      },
    }
  },
  methods: {
    initTableData() {
      let data = [];
      for (let i = 0; i < 15; i++) {
        data.push({
          rowKey: i,
          name: i,
          date: i,
          hobby: i,
          address: i,
        });
      }
      this.tableData = data;
    },

    initFooterData() {
      this.footerData = [
        {
          rowKey: 0,
          name: "合计",
          date: 213,
          hobby: 355,
          address: 189,
        },
        {
          rowKey: 1,
          name: "汇总值",
          date: 1780,
          hobby: 890,
          address: 2988,
        },
      ];
    },
    // 给可控属性重新赋值
    changeSelectedRowKeys(keys) {
      this.checkboxOption.selectedRowKeys = keys;
    },
    // 行点击触发
    changeSelectedRowKeysByRowClick(currentRowKey) {
      const { selectedRowKeys } = this.checkboxOption;

      if (selectedRowKeys.includes(currentRowKey)) {
        const rowKeyIndex = selectedRowKeys.indexOf(currentRowKey);
        selectedRowKeys.splice(rowKeyIndex, 1);
      } else {
        selectedRowKeys.push(currentRowKey);
      }
    },

  },
  created() {
  this.initTableData();
  this.initFooterData();
},
}
</script>

<style scoped>
  .clearfix{
    text-align: left;
  }
 .title-img{
   padding-left: 5px;
   border-width: 0px;
   left: 0px;
   top: 0px;
   width: 4px;
   height: 18px;
   background: inherit;
   border-left:4px solid rgba(83, 146, 255, 1);
   border-radius: 3px;
   -moz-box-shadow: none;
   -webkit-box-shadow: none;
   box-shadow: none;
 }
</style>