<template>
  <div class="set-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>数据曲线图</span>
    </div>
    <div class="data-cell">
      <div class="cell-header">
        <div class="title"><span>PM2.5曲线图(ug/m³)</span></div>
        <div class="cell-right">
          <yd-radio-group v-model="radio1" color="#3fa9f5">
            <yd-radio val="时"></yd-radio>
            <yd-radio val="日"></yd-radio>
            <yd-radio val="月"></yd-radio>
          </yd-radio-group>
        </div>
      </div>
      <div class="cell-data">
        <my-echarts id="echart1"></my-echarts>
      </div>
    </div>
     <div class="data-cell">
      <div class="cell-header">
        <div class="title"><span>CO2曲线图(PPM)</span></div>
        <div class="cell-right">
          <yd-radio-group v-model="radio2" color="#3fa9f5">
            <yd-radio val="时"></yd-radio>
            <yd-radio val="日"></yd-radio>
            <yd-radio val="月"></yd-radio>
          </yd-radio-group>
        </div>
      </div>
      <div class="cell-data">
        <my-echarts id="echart2"></my-echarts>
      </div>
    </div>
    <div class="data-cell">
      <div class="cell-header">
        <div class="title"><span>VOC曲线图(mg/m³)</span></div>
        <div class="cell-right">
          <yd-radio-group v-model="radio3" color="#3fa9f5">
            <yd-radio val="时"></yd-radio>
            <yd-radio val="日"></yd-radio>
            <yd-radio val="月"></yd-radio>
          </yd-radio-group>
        </div>
      </div>
      <div class="cell-data">
        <my-echarts id="echart3"></my-echarts>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import MyEcharts from '../../components/echart';
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio';

export default {
  data () {
    return {
     value:'',
     radio1:'时',
     radio2:'时',
     radio3:'时',
     chart:null,
     id: {
      type: String,
      default: 'chart'
     },
    }
  },
  created(){
    
  },
  components: {
    'yd-radio-group':RadioGroup,
    'yd-radio':Radio,
    'my-echarts':MyEcharts
  },
  computed: {
  },
  watch: {
  },
  mounted(){
    //this.initChart();
  },
  methods:{
    returnMethod(){
      this.$router.back(-1);
    },
    initChart(){
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        tooltip : {
        trigger: 'axis'
        },
        legend: {
            data:[]
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['2','4','5','8','10','12','16','18','20','22','24'],
            }
        ],
        yAxis : [
            {
              type : 'value'
            }
        ],
        series : [
            {
              name:'',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210,210,22,33,88],
              itemStyle: {
                normal:{
                  color: "#999999",
                  lineStyle: {
                    color: "#3fa9f5"
                  }
                }
              }
            },
        ],
        grid:{
          x: 5,
          y:20,
          y2:20
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .set-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    .header{
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      position: relative;
      .return{
        position: absolute;
        left:0px;
        background: url('../../assets/arr-left.png') no-repeat center center;
        background-size: 8px 16px;
        width: 40px;
        height: 40px;
        display: block;
        top:0px;
      }
    }
    .data-cell{
      padding: 10px 10px;
      background: #ffffff;
      margin-bottom: 10px;
      .cell-header{
        position: relative;
        display: flex;
        .title{
          display: flex;
          font-size: 14px;
        }
        .cell-right{
          flex: 1;
          text-align: right
        }
      }
      .chart{
        width: 100%;
        height: 250px;
      }
      &:last-child{
        margin-bottom: 0px;
      }
    }
  }
  
</style>

