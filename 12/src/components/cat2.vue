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
      this.$axios.get('/goods/5cb337ba8a97182644529c5c').then(res => {
        if (res.code == 200) {
          this.listData = res.data;
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
