<template>
  <div class="chart" :id="id"></div>
</template>
<script>
  import echarts from 'echarts'
  import { Loading } from 'vue-ydui/dist/lib.rem/dialog';
  import Vue from 'vue'
  export default {
    props: {
        id: {
            type: String,
            default: 'chart'
        },
    },
    data() {
      return {
        chart: null
      }
    },
    created(){
    },
    mounted(){
      let that = this;
      Loading.open('很快加载好了');
      setTimeout(function(){
        Loading.close();
        that.initChart();
      },1000)
      Vue.nextTick(function () {
        //that.initChart();
      })
    },
    methods:{
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id));
        
        this.chart.setOption({
          tooltip : {
          trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data : ['2','4','5','8','10','12','16','18','20','22','24'],
          },
          calculable : true,
         yAxis : [
            {
            type : 'value'
            }
          ],
          grid:{
            x: 5,
            y:20,
            y2:20
          },
          series: [{
            data:[120, 132, 101, 134, 90, 230, 210,210,22,33,88],
            type: 'line',
            areaStyle: {
              normal: {}
            },
            itemStyle:{
              normal:{
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: '#409cf1'},
                      {offset: 0.5, color: '#abddfc'},
                      {offset: 1, color: '#ffffff'}
                  ]
                )
              }
            }
          }]
        })
      }
  }
}
</script>
