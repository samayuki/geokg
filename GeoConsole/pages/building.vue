<template>
  <el-row class="content">
    <el-col class="detail">
      <h1 class="title--3x">{{buildingData.name}}</h1>
      <table>
        <tbody>
        <tr>
          <th>所属区域：</th>
          <td>{{buildingData.region}}</td>
        </tr>
        <tr>
          <th>所属行政区：</th>
          <td>{{buildingData.district}}</td>
        </tr>
        <tr>
          <th>建筑类型：</th>
          <td>{{buildingData.types}}</td>
        </tr>
        <tr>
          <th>地址：</th>
          <td>{{buildingData.address}}</td>
        </tr>
        <tr>
          <th>建筑年代：</th>
          <td>{{buildingData.built_year}}</td>
        </tr>
        <tr>
          <th>材料：</th>
          <td>{{buildingData.materials}}</td>
        </tr>
        <tr>
          <th>描述：</th>
          <td>{{buildingData.description}}</td>
        </tr>
        </tbody>
      </table>
      <div class="detail-img">
        <el-carousel :interval="3000" arrow="always" style="width: 90%;" height="200px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col id="kg" v-loading="loading"></el-col>
  </el-row>
</template>
<script>
  import axios from "../plugins/axios";
  import   '../plugins/echarts';
  export default {
    head: {
      title: "Detail | 建筑详情",
    },
    data() {
      return {
        name: null,
        buildingData: {},
        kgOptions: {},
        loading: true,
        size_l: 60,
        size_s: 30,
        line_l: 250,
        line_m: 200
      }
    },
    asyncData({context, route}) {
      return {
        name: route.query.name
      }
    },
    async created(){
      try {
        // await axios.get("/api/getBuildingByName", {params: {name: this.name}}).then(({data})=>{
        //   this.buildingData = data.buildingData;
        // });

      } catch (e) {
        console.log(e.message);
      }
    },
    watch:{
      buildingData: function (val) {
        this.setEChartsKG();
        this.loading = false;
      }
    },
    beforeMount() {
      this.setEChartsKG();
    },
    methods: {
      setEChartsKG() {
        let myChart = this.$echarts.init(document.getElementById('kg'),null, {render: 'svg'});
        var size = 40;
        var listdata = [];
        var links = [];
        var legendes = [];
        var texts = [];
        var property = [];
        var source = {};
        var data = this.buildingData;
        function setNodeData(name, category, i, type) {
          let symbol = "circle";
          let symbolRotate = 0;
          let size_s = size;
          if(type === "center") {
            symbol = "image://" +require('../assets/img/building-img-demo.jpg');
            size_s = size * 2.5;
          } else if(type === "key") {
            symbol = "rect";
            symbolRotate = 45;
            size_s = size * 1.1;
          } else {
            size_s = size * 1.5;
          }
          listdata.push({
            x: i * size * 2,
            y: size + size * (i%2),
            "name": name,
            "symbolSize": size_s,
            "category": category,
            "draggable": "true",
            "symbol":symbol,
            "symbolRotate": symbolRotate,
            itemStyle: {
              normal: {
                "opacity": 0.95,
              }
            }
          })
        }
        function setLinkData(source, target) {
          links.push({
            "source": source,
            "target": target,
            lineStyle: {
              normal: {
                color: 'source',
              }
            }
          })
        }
        for(let keyName in data) {
          property.push(keyName);
          legendes.push(keyName);
        }
        legendes.push("center");
        for(let i = 0; i < property.length; i++) {
          let pro = data[property[i]];
          if(typeof(pro) === "string") {
            let arr = pro.split(",");
            source[property[i]] = arr;
          } else if(pro instanceof Array){
            source[property[i]] = pro;
          } else {
            let arr = [];
            for(let keyName in pro) {
              arr.push(keyName + ":" + pro[keyName]);
            }
            source[property[i]] = arr;
          }
        }
        for (let i = 0; i < legendes.length; i++) {
          texts.push({
            "name": legendes[i],
          })
        }
        setNodeData("center", property.length, property.length, "center");
        for(let i = 0; i < property.length; i++) {
          let name = property[i];
          let len = source[name].length;
          setNodeData(name, i, len, "key");
          for(let j = 0; j < len; j++) {
            setNodeData(source[name][j], i, j, "value");
            setLinkData(name, source[name][j]);
          }
          setLinkData("center", name);
        }

        if(this.buildingData.name === "立园") {
          listdata = [{category: 1, name: "主体结构与装饰", value: 2, id: ":building_part/5bc32c20452a5846d4946975", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc33a0d6b71003744331326:materials", symbol: "circle"},
            {category: 1, name: "壁炉、墙体", value: 2, id: ":building_part/5bc32cc8452a5846d4946977", symbol: "circle"},
            {category: 1, name: "毓培别墅-过道、楼梯", value: 2, id: ":building_part/5bc339bb6b71003744331325", symbol: "circle"},
            {category: 1, name: "过道、楼梯", value: 2, id: ":building_part/5bc339286b71003744331324", symbol: "circle"},
            {category: 4, name: "", value: 2, id: ":building/5bc31bd756943146d48ecd73", symbol: "image://https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3127997783,2847505974&fm=58&bpow=3075&bpoh=2216"},
            {category: 2, name: "水磨石", value: 2, id: ":material/5bc31f1056943146d48ecd7a", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc339286b71003744331324:materials", symbol: "circle"},
            {category: 2, name: "玻璃", value: 2, id: ":material/5bc31f1b56943146d48ecd7b", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc32c87452a5846d4946976:materials", symbol: "circle"},
            {category: 2, name: "铁", value: 2, id: ":material/5bc31e6756943146d48ecd74", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc32b8f452a5846d4946974:materials", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc32c20452a5846d4946975:materials", symbol: "circle"},
            {category: 2, name: "涂料", value: 2, id: ":material/5bc31ed356943146d48ecd78", symbol: "circle"},
            {category: 2, name: "金属", value: 2, id: ":material/5bc31ead56943146d48ecd76", symbol: "circle"},
            {category: 1, name: "主体结构", value: 2, id: ":building_part/5bc3258256943146d48ecd82", symbol: "circle"},
            {category: 1, name: "花藤亭", value: 2, id: ":building_part/5bc32b8f452a5846d4946974", symbol: "circle"},
            {category: 2, name: "瓷砖", value: 2, id: ":material/5bc31ec756943146d48ecd77", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc338af6b71003744331323:materials", symbol: "circle"},
            {category: 1, name: "绊立楼厅内", value: 2, id: ":building_part/5bc33a0d6b71003744331326", symbol: "circle"},
            {category: 2, name: "石膏", value: 2, id: ":material/5bc31ef256943146d48ecd79", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc32cc8452a5846d4946977:materials", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc339bb6b71003744331325:materials", symbol: "circle"},
            {category: 1, name: "主体结构与窗式", value: 2, id: ":building_part/5bc32c87452a5846d4946976", symbol: "circle"},
            {category: 5, name: "has_part", value: 2, id: ":building/5bc31bd756943146d48ecd73:has_part", symbol: "circle"},
            {category: 1, name: "铺地", value: 2, id: ":building_part/5bc32d25452a5846d4946978", symbol: "circle"},
            {category: 1, name: "绊立楼-墙壁、天花板", value: 2, id: ":building_part/5bc338af6b71003744331323", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc32d25452a5846d4946978:materials", symbol: "circle"},
            {category: 3, name: "materials", value: 2, id: ":building_part/5bc3258256943146d48ecd82:materials", symbol: "circle"},
            {category: 2, name: "水泥", value: 2, id: ":material/5bc31e9056943146d48ecd75", symbol: "circle"}];
          links =[{source: ":building_part/5bc338af6b71003744331323", name: "", target: ":building_part/5bc338af6b71003744331323:materials"},
            {source: ":building_part/5bc338af6b71003744331323:materials", name: "", target: ":material/5bc31ef256943146d48ecd79"},
            {source: ":building_part/5bc338af6b71003744331323:materials", name: "", target: ":material/5bc31ed356943146d48ecd78"},
            {source: ":building_part/5bc32c20452a5846d4946975:materials", name: "", target: ":material/5bc31e9056943146d48ecd75"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc338af6b71003744331323"},
            {source: ":building_part/5bc33a0d6b71003744331326:materials", name: "", target: ":material/5bc31f1b56943146d48ecd7b"},
            {source: ":building_part/5bc3258256943146d48ecd82:materials", name: "", target: ":material/5bc31e6756943146d48ecd74"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc32c87452a5846d4946976"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc339286b71003744331324"},
            {source: ":building_part/5bc32b8f452a5846d4946974", name: "", target: ":building_part/5bc32b8f452a5846d4946974:materials"},
            {source: ":building_part/5bc32b8f452a5846d4946974:materials", name: "", target: ":material/5bc31ead56943146d48ecd76"},
            {source: ":building_part/5bc32d25452a5846d4946978", name: "", target: ":building_part/5bc32d25452a5846d4946978:materials"},
            {source: ":building_part/5bc32d25452a5846d4946978:materials", name: "", target: ":material/5bc31ec756943146d48ecd77"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc3258256943146d48ecd82"},
            {source: ":building_part/5bc339bb6b71003744331325", name: "", target: ":building_part/5bc339bb6b71003744331325:materials"},
            {source: ":building_part/5bc33a0d6b71003744331326", name: "", target: ":building_part/5bc33a0d6b71003744331326:materials"},
            {source: ":building_part/5bc339bb6b71003744331325:materials", name: "", target: ":material/5bc31f1056943146d48ecd7a"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc339bb6b71003744331325"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc32cc8452a5846d4946977"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc33a0d6b71003744331326"},
            {source: ":building_part/5bc339286b71003744331324", name: "", target: ":building_part/5bc339286b71003744331324:materials"},
            {source: ":building_part/5bc32c20452a5846d4946975", name: "", target: ":building_part/5bc32c20452a5846d4946975:materials"},
            {source: ":building_part/5bc339286b71003744331324:materials", name: "", target: ":material/5bc31ec756943146d48ecd77"},
            {source: ":building_part/5bc3258256943146d48ecd82", name: "", target: ":building_part/5bc3258256943146d48ecd82:materials"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc32b8f452a5846d4946974"},
            {source: ":building_part/5bc32c87452a5846d4946976:materials", name: "", target: ":material/5bc31e9056943146d48ecd75"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc32c20452a5846d4946975"},
            {source: ":building/5bc31bd756943146d48ecd73:has_part", name: "", target: ":building_part/5bc32d25452a5846d4946978"},
            {source: ":building_part/5bc32cc8452a5846d4946977", name: "", target: ":building_part/5bc32cc8452a5846d4946977:materials"},
            {source: ":building_part/5bc32cc8452a5846d4946977:materials", name: "", target: ":material/5bc31ec756943146d48ecd77"},
            {source: ":building_part/5bc32c87452a5846d4946976", name: "", target: ":building_part/5bc32c87452a5846d4946976:materials"},
            {source: ":building_part/5bc3258256943146d48ecd82:materials", name: "", target: ":material/5bc31e9056943146d48ecd75"},
            {source: ":building/5bc31bd756943146d48ecd73", name: "", target: ":building/5bc31bd756943146d48ecd73:has_part"}];
          legendes = ["datavalue","building_part","material","materials","building","has_part"];
          texts = [{"name": "字面值"},{"name": "building_part"},{"name": "material"},{"name": "materials"}, {"name": "building"}, {"name": "has_part"}];
          listdata.map(function (value, index) {
            value["symbolSize"] = 60;
            value["draggable"] = true;
            if(value.category === 3 || value.category === 5) {
              value["symbol"] = "rect";
              value["symbolSize"] = 40;
              value["symbolRotate"] = 45;
            }
            return value;
          })
        }


        let option = {
          title: {
            text: "知识图谱",
            top: "top",
            left: "left",
            textStyle: {
              color: '#f7f7f7'
            }
          },
          tooltip: {
            formatter: '{b}'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            feature: {
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            },
          },
          backgroundColor: "#122243",
          legend: {
            data: legendes,
            textStyle: {
              color: '#fff'
            },
            icon: 'circle',
            type: 'scroll',
            orient: 'vertical',
            left: 10,
            top: 20,
            bottom: 20,
            itemWidth: 10,
            itemHeight: 10
          },
          animationDuration: 1000,
          animationEasingUpdate: 'quinticInOut',
          series: [{
            name: '知识图谱',
            type: 'graph',
            layout: 'force',
            focusNodeAdjacency: true,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            force: {
              repulsion: 500,
              gravity: 0.1,
              edgeLength: 60,
              layoutAnimation: true,
            },
            data: listdata,
            links: links,
            categories: texts,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{b}',
                fontSize: 16,
                fontStyle: '600'
              }
            },
            itemStyle: {
              "symbolSize": 60,
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1.5,
                curveness: 0
              }
            }
          }]
        };
        myChart.setOption(option);
      }
    }
  }
</script>
<style>
  #kg {
    width: 55%;
    height: 550px;
    background-color: #122243;
    overflow: hidden;
    display: inline-block;
  }
  .content {
    width: 95%;
    margin: auto auto;
  }
  .detail {
    text-align: left;
    display: inline-block;
    width: 45%;
  }
  .detail table tr {
    height: 35px;
  }
  .detail table th {
    min-width: 100px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  .detail-img {
    margin-top: 30px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
