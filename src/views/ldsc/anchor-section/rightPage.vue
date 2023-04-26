<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">基础测量数据</el-menu-item>
        <el-menu-item index="2">岔线中心测量数据</el-menu-item>
        <el-menu-item index="3">限界测量数据</el-menu-item>
        <el-menu-item index="4">非支测量数据</el-menu-item>
        <el-menu-item index="5">定位器测量数据</el-menu-item>
        <el-menu-item index="6">承力索高差测量</el-menu-item>
        <el-menu-item index="7">500m处高差测量</el-menu-item>
        <el-menu-item index="8">自由测数据</el-menu-item>
        <el-menu-item index="9">垂直度数据</el-menu-item>
        <el-menu-item index="10">跨距测量数据</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div>
        <el-row :gutter="1">
          <el-col :span="3" v-show="activeIndex==='1'">
            <el-button-group>
              <el-button size="small" @click="select" autofocus>数 据</el-button>
              <el-button size="small" @click="dropper">吊  弦</el-button>
              <el-button size="small" @click="tableVis=!tableVis">曲线图</el-button>
            </el-button-group>
          </el-col >
          <el-col :span="12">
            <el-row>
              <el-col :span="2">
                <span class="el-text-number">支柱号:</span>
              </el-col>
              <el-col :span="4">
                <el-input size="small" type="text" placeholder="请输入" v-model.trim="ebsName"></el-input>
              </el-col>
              <el-col :span="2">
                <el-button size="small" type="primary" @click="search">查询</el-button>
              </el-col>
              <el-col :span="2">
                <el-button size="small" >导出</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <rd-table  v-if="tableVis" :defined-colum="['ebsName', 'totalNum']" :onDefinedColum="onDefinedColum" ref="rdTable" :num-vis="true" :table-width="'calc(100%)'"  :is-sort="false"/>
      <earch v-else/>
    </el-main>
   <device-info ref="deviceInfo" v-if="infoVisible"/>
  </el-container>

</template>

<script>
import RdTable from "@/components/rdtable/rd-table";
import LdscDeviceDriver from "./ldscDeviceDriver";
import earch from "./earch";
import DeviceInfo from "@/views/ldsc/anchor-section/deviceInfo";

export default {
  name: "rightPage",
  components: {DeviceInfo, RdTable, earch},
  data() {
    return {
      activeIndex: '1',
      ebsName: '',
      tableVis: true,
      infoVisible: false,
      // 表格驱动
      deviceDriver: new LdscDeviceDriver(),
    };
  },
  mounted() {
    this.initDevice(this.activeIndex)
  },
  methods: {
    initDevice(index){
      this.tableVis = true
      this.$nextTick(() => {
        this.deviceDriver.onInit(this.$refs.rdTable, index)
      })
    },
    handleSelect(key, keyPath) {
      this.activeIndex=keyPath[0]
      this.initDevice(this.activeIndex)
    },
    select() {
      this.deviceDriver.doList({ebsName:this.ebsName})
    },
    dropper(){
      this.initDevice('11')
    },
    search() {
      this.deviceDriver.listQuery = {ebsName:this.ebsName}
      this.deviceDriver.doList()
    },
    openInfo(row) {

      this.tableVis = false
      this.$nextTick(() => {
        this.$refs.deviceInfo.init(row, this.activeIndex)
      })
    },
    onDefinedColum(val, type, row){
      if ('totalNum' === type) {
        return <span style="color:#5392FF;" onClick="openInfo">{val}</span>
      }
      if ('ebsName' === type) {
        <button
            className="button-demo"
            on-click={() => this.openInfo(row)}
        >
          {val}
        </button>
        return <span style="color:#5392FF;">{val}</span>
      }
    }
  }
}
</script>

<style scoped>
 .el-text-number{
    padding: 9px 15px;
    font-size: 12px;
    display: inline-block;
    line-height: 1;
 }
</style>