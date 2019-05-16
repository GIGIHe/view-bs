<template>
  <div class="wraper">
    <!-- swiper -->
    <!-- <swiper
      :options="swiperOption"
      class="swper"
    >
      <swiper-slide>最近上新</swiper-slide>
      <swiper-slide
        v-for="(item,index) in ads"
        :key="index"
      >{{item.ad}}</swiper-slide> -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- </swiper> -->
    <el-input
      v-model.trim="search"
      class="search"
      @keyup.enter.native="search_btn"
    ></el-input>
    <el-button
      type="primary"
      icon="el-icon-search"
      @click="search_btn"
    >搜索</el-button>
    <ul>
      <li
        class="item"
        v-for="(item,index) in result"
        :key="index"
        @mouseover="hover(index)"
        @mouseout="showUpdate = -1"
        :class="showUpdate == index?'boxshow':''"
      >
        <img
          v-lazy="item.poster"
          alt
          :title="item.g_desc"
        >
        <span class="title">{{item.g_name}}</span>
        <span class="price">￥{{item.g_price}}</span>
        <p
          class="car"
          @click="add(item._id)"
        >加入购物车</p>
      </li>
    </ul>
  </div>
</template>

<script >
import "../common/common.scss";
export default {
  props: {
    listData: Array
  },
  data() {
    return {
      showUpdate: -1,
      isShow: false,
      search: "",
      result: "",
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      ads: [
        { ad: "来自新蔡的顿岗大米" },
        { ad: "泌阳花菇甲天下，泌阳香菇" },
        { ad: "'中原人参'之称的张湾萝卜" },
        { ad: "平舆小磨香油" },
        { ad: "蔡县的蔡酥梨" },
        { ad: "洙湖珍珠红石榴" }
      ]
    };
  },
  watch: {
    listData(n, old) {
      return (this.result = n);
    }
  },
  // computed:{
  //   result(){
  //     return this.listData
  //   }
  // },
  methods: {
    hover: function(index) {
      // console.log(index)
      this.showUpdate = index;
      this.isShow = !this.isShow;
    },
    add(id) {
      this.$axios.post("carList", { goods: id }).then(res => {
        if (res.code == 200) {
          // console.log(res.data);
          this.$message({
            type: "success",
            message: res.msg
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    //搜索
    search_btn() {
      let search = this.search;
      let res = this.listData.filter(item => {
        // console.log(item,item.g_name,search);
        // console.log(item.g_name.indexOf(search));
        return item.g_name.indexOf(search) > -1;
      });
      if (res == "") {
        this.$message({
          type: "info",
          message: "商品暂时未上架哦"
        });
      }
      // console.log(res);
      return (this.result = res); //不要直接赋值给listData,result是计算属性,需要使用setter方法
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 50%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
// .swper {
//   border: 1px solid #ddd;
//   width: 500px;
//   height: 30px;
//   line-height: 30px;
//   font-size: 14px;
//   color:#f40;
//   padding-left: 10px;
// }
</style>
