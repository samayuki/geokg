<template>
  <div class="linkage">
    <el-cascader
      placeholder="试试搜索：开平"
      :options="options"
      v-model="city"
      expand-trigger="click"
      @change="choseCity"
      filterable>
    </el-cascader>
  </div>
</template>

<script>
  import axios from '../plugins/axios'
  import {cityMap, options} from "../assets/js/cityselect.js";
  export default {
    name: "city-select",
    data() {
      return {
        options: [],
        city: [],
        cityMap: {}
      }
    },
    mounted() {
      this.getCityData();
    },
    methods: {
      getCityData() {
        this.options = options;
        this.cityMap = cityMap;
      },
      choseCity() {
        console.log('choose city ' + this.city);
        console.log(this.city.map(id => {return this.cityMap[id].fullname;}));
      },
      getCity() {
        return this.city.map(id => {return this.cityMap[id].fullname;});
      },
      clearCity() {
        this.city = [];
      }
    },
    watch: {
      city: {
        handler:function (val, oldVal) {
          this.$emit('cityChange', this.getCity());
        },
        deep: true,
      },
    }
  }
</script>

