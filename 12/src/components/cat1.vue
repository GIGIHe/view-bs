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
      this.$axios.get('/goods/5cda219b1a14ca17dcc4b1ae').then(res => {
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
.causl{
  border:1px solid red;
  margin-top: 60px;
  height: 40px;
  overflow: hidden;
  .items{
    widows: 100px;
    border: 1px solid black;
  }
}
</style>
