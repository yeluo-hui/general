<template>
  <baidu-map class="bm-view"
             ak="YOUR_APP_KEY"
             :center="mapOptions.center"
             :zoom="mapOptions.zoom"
             :scroll-wheel-zoom="true"
  >
    <bml-curve-line ref="cureLineRef"  class="Zmap-Marker" :points="points" :editing="true" @lineupdate="update" @click="clickHandler($event)" strokeColor="rgb(0, 44, 204,1)">
    </bml-curve-line>
    <bml-marker-clusterer :averageCenter="true">
      <bm-marker v-for="(marker, index) of cityData" :position="{lng: marker.location.lng, lat: marker.location.lat}"
                 @click="clickHandler($event, index)" :icon="currentIcon(index)">
        <bm-label v-if="index===currentIndex" :content="marker.name" :labelStyle="selectLabelStyle"
                  :offset="{width: -10, height: 20}" @click="clickHandler($event, index)"/>
        <bm-label v-else :content="marker.name" :labelStyle="otherLabelStyle" :offset="{width: -10, height: 20}"
                  @click="clickHandler($event, index)"/>
      </bm-marker>
    </bml-marker-clusterer>
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {BmlCurveLine, BmlMarkerClusterer, BmMarker, BmLabel} from 'vue-baidu-map'

export default {
  name: 'baiduMap',
  components: {
    'baidu-map': BaiduMap,
    'bml-curve-line': BmlCurveLine,
    'bml-marker-clusterer': BmlMarkerClusterer,
    'bm-marker': BmMarker,
    'bm-label': BmLabel
  },
  data() {
    return {
      mapOptions: {
        center: '湖北省',
        zoom: 9,
      },
      cityData: [
        {name: '武汉市', location: {lng: 114.298572, lat: 30.584355}},
        {name: '襄阳市', location: {lng: 112.128537, lat: 32.014796}},
        {name: '荆州市', location: {lng: 112.239741, lat: 30.335165}},
        {name: '宜昌市', location: {lng: 111.292971, lat: 30.697602}},
        {name: '十堰市', location: {lng: 110.787916, lat: 32.646907}},
      ],
      points: [],
      currentIndex: 1,
      YOUR_APP_KEY: 'gS0S3iTLxXnpvxfM6UjMmVq9s0Ln0sU6',
      iconUrl: require('@/assets/img/prey.png'),
      iconRedUrl: require('@/assets/img/red.png'),
      selectLabelStyle: {color: 'red', fontSize: '12px', backgroundColor: 'transparent', border: 0},
      otherLabelStyle: {color: 'blue', fontSize: '12px', backgroundColor: 'transparent', border: 0}
    }
  },
  created() {
  },
  mounted() {
    this.setPoint();
  },
  computed: {
    currentIcon() {
      return function (index) {
        let icon = index === this.currentIndex ? this.iconUrl : this.iconRedUrl
        return {url: icon, size: {width: 25, height: 25}}
      }
    }
  },
  methods: {
    clickHandler(e, index=null) {
      this.currentIndex = index
      this.change()
    },
    setPoint() {
      this.points = this.cityData.map(city => city.location)
    },
    update(e) {
      this.points = e.target.cornerPoints
    },
    change() {
      let ref = this.$refs['cureLineRef']
      console.log(ref)
    }
  }
}
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
<style>
.BMap_Marker img {
  /*display: none !important;*/
}
</style>
