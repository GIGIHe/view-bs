<template>
  <div>
    <muban :listData = "listData"></muban>
  </div>
</template>

<script>
import muban from "./muban.vue";
export default {
  components: {
    muban
  },
  data() {
    return {
      listData: []
    };
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData() {
      this.$axios.get('/goods/5cda21b01a14ca17dcc4b1b0').then(res => {
        if (res.code == 200) {
          this.listData = res.data;


        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
