<template>
  <el-dialog
      :title="row.ebsName + '支柱测量记录'"
      :visible.sync="visible"
      width="30%"
      :before-close="close">
    <rd-table ref="infoTable"/>
  </el-dialog>
</template>

<script>
import RdTable from "@/components/rdtable/rd-table";
import DeviceInfoDriver from "./deviceInfoDriver";
export default {
  name: "deviceInfo",
  components: {RdTable},
  data() {
    return {
      visible: false,
      deviceInfoDriver: new DeviceInfoDriver(),
      row: {}
    }
  },
  methods: {
    init(data, index) {
      this.visible = true
      this.row = data
      this.$nextTick(() => {
        this.deviceInfoDriver.onInit(this.$refs.infoTable, data.id, index)
      })
    },
    close() {
      this.visible = false
    }
  }

}
</script>

<style scoped>

</style>