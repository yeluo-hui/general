<template>
  <!-- {% raw %} -->
  <div class="row">
    <div class="mx-auto" :style="compact ? { width: '200px' } : {}">
      <VueFileAgent
          ref="vueFileAgent"
          :auto="auto"
          :averageColor="averageColor"
          :uploadUrl="uploadUrl"
          :uploadHeaders="uploadHeaders"
          :multiple="multiple"
          :meta="meta"
          :deletable="deletable"
          :editable="editable"
          :linkable="linkable"
          :sortable="sortable"
          :readonly="readonly"
          :resumable="resumable"
          :disabled="disabled"
          :compact="compact"
          :accept="valAccept"
          :capture="valCapture"
          :maxSize="valMaxSize"
          :maxFiles="valMaxFiles"
          :theme="theme"
          @select="filesSelected($event)"
          @delete="fileDeleted($event)"
          @beforedelete="onBeforeDelete($event)"
          @upload="uploadEvent('upload', $event)"
          @upload:error="uploadEvent('upload:error', $event)"
          @upload:delete="uploadEvent('upload:delete', $event)"
          @upload:delete:error="uploadEvent('upload:delete:error', $event)"
          @upload:update="uploadEvent('upload:update', $event)"
          @upload:update:error="uploadEvent('upload:update:error', $event)"
          v-model="fileRecords"
      ></VueFileAgent>
    </div>
    <div v-if="!auto" class="mb-2">
      <button
          class="btn btn-outline-secondary mb-2"
          :disabled="!fileRecordsForUpload.length"
          @click="uploadFiles()"
      >
        上传 ({{ fileRecordsForUpload.length }})
      </button>
      <button
          type="button"
          class="btn btn-outline-danger mb-2"
          @click="removeAll()"
          :disabled="!fileRecords.length"
      >
        移除所有 ({{ fileRecords.length }})
      </button>
    </div>
  </div>
</template>

<script>

import {getToken} from "@/utils/auth";

export default {
  name: 'CusUpload',
  props: {
    colName: {
      type: String,
      required: true
    },
    fileRecords: {
      type: Array,
      required: true
    },
    // 参数
    uploadHeaders: {
      type: Object,
      required: true
    },
    // 路径
    server: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      // fileRecords: this.getFileRecordsInitial(),
      fileRecordsForUpload: [],
      auto: true,
      averageColor: true,
      uploadUrl: 'http://127.0.0.1:8080/common/jsonUpload',
      uploadHeaders: {'token': getToken()},
      meta: true,
      multiple: true,
      deletable: true,
      editable: true,
      linkable: true,
      sortable: false,
      readonly: false,
      resumable: false,
      disabled: false,
      compact: false,
      theme: 'list',
      sortDirection: {
        lastModified: 'ASC',
        name: 'ASC',
      },
      selectedIdx: 1,
      valAccept: 'image/*,video/*,.pdf,.doc,.docx,.ods',
      valCapture: '',
      valMaxSize: '10MB',
      valMaxFiles: 14,
    };
  },
  computed: {
    // 复制一次路径
    uploadEndpoint: function () {
      return this.uploadUrl;
    },
  },
  methods: {
    uploadEvent(eventName, data) {
      console.log('UPLOAD EVENT ', eventName, data);
      let cols = data.map(item => {
        return item.data
      })
      this.$emit('uploadData', this.colName, eventName, cols)
    },
    /*getFileRecordsInitial: function () {
      return window.getFileRecordsInitial();
    },*/
    getSelectedFileRecord: function () {
      var i = this.selectedIdx;
      i = i - 1;
      if (!this.fileRecords[i]) {
        return;
      }
      return this.fileRecords[i];
    },
    removeAll: function () {
      console.log(this.fileRecords);
      this.fileRecords = [];
      this.fileRecordsForUpload = [];
    },
    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(this.uploadEndpoint, this.uploadHeaders, this.fileRecordsForUpload);
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadEndpoint, this.uploadHeaders, fileRecord);
    },
    filesSelected: function (fileRecords) {
      console.log('filesSelected', fileRecords);
      var validFileRecords = [];
      for (var i = 0; i < fileRecords.length; i++) {
        if (!fileRecords[i].error) {
          validFileRecords.push(fileRecords[i]);
        }
      }
      console.log('filesSelected', fileRecords, validFileRecords);
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm('确定删除文件吗?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  }
};
</script>
<style scoped>
.row {
  width: 80%;
}
</style>
