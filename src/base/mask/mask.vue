<template>
  <div class="mask" :style="styles" @touchmove.prevent></div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bgcolor: {
      type: String,
      default: '#000'
    },
    zindex: {
      default: 1500
    },
    opacity: {
      default: .4
    },
    animated: {
      type: Boolean,
      default: true
  }
  },
  data () {
    return {
      show:this.value
    }
  },
  mounted(){
  },
  methods:{

  },
  watch: {
    value(val){
      this.show = val;
    }
  },
  computed: {
    styles() {
      const style = {'z-index': this.zindex, 'background-color': this.bgcolor};
      if(this.show) {
          style['opacity'] = this.opacity;
          style['pointer-events'] = 'auto';
      }
      return style;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .mask {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    transition: opacity .2s ease-in;
    opacity: 0;
  }
</style>

