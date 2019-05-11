<template>
  <div>
    <Header></Header>
     <!-- <img src="../assets/timg.jpg" alt="" v-show="show_img"> -->
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  mounted() {

  },
  data() {
    return {
   show_img:false
    };
  },
  methods: {

  },
  //  beforeRouteEnter (to, from, next) {
  //  console.log(to);
  // },
};
</script>

<style lang="scss" scoped>
</style>
